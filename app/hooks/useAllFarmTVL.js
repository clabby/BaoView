import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import _ from 'lodash'

import { getEarned, getMasterChefContract, getFarms } from '../lib/bao/utils'
import useBao from './useBao'
import useMainnetWeb3 from './useMainnet'
import useBlock from './useBlock'
import usePriceData from './usePriceData'

import erc20Abi from '../lib/bao/lib/abi/erc20.json'
import lpAbi from '../lib/bao/lib/abi/uni_v2_lp.json'
import cgList from '../lib/cg-list.json'

const fetchTotalLocked = (farm, priceData, bao, web3) => {
  return new Promise((resolve, reject) => {
    if (priceData !== -1) {
      if (farm.pid === 136) {
        console.log(totalSupply.toNumber())
        console.log(totalSupplyMainnet.toNumber())
      }
      
      const lpContract = farm.poolType && farm.poolType === 'sushi' ?
        new web3.eth.Contract(lpAbi, farm.lpTokenAddressMainnet) :
        farm.lpContract

      lpContract.methods.getReserves().call().then(reserves => {
        lpContract.methods.token0().call().then(tokenAddress0 => {
          lpContract.methods.token1().call().then(tokenAddress1 => {
            const token0Contract = farm.poolType && farm.poolType === 'sushi' ?
              new web3.eth.Contract(erc20Abi, tokenAddress0) :
              new bao.web3.eth.Contract(erc20Abi, tokenAddress0)
            const token1Contract = farm.poolType && farm.poolType === 'sushi' ?
              new web3.eth.Contract(erc20Abi, tokenAddress1) :
              new bao.web3.eth.Contract(erc20Abi, tokenAddress1)
            token0Contract.methods.symbol().call().then(symbol0 => {
              token0Contract.methods.decimals().call().then(decimals0 => {
                token1Contract.methods.symbol().call().then(symbol1 => {
                  token1Contract.methods.decimals().call().then(decimals1 => {
                    const tokens = [
                      {
                        balance: reserves["_reserve0"] / (10 ** parseInt(decimals0)),
                        decimals: decimals0,
                        symbol: symbol0,
                        id: _.find(cgList, { symbol: symbol0.toLowerCase() }).id
                      },
                      {
                        balance: reserves["_reserve1"] / (10 ** parseInt(decimals1)),
                        decimals: decimals1,
                        symbol: symbol1,
                        id: _.find(cgList, { symbol: symbol1.toLowerCase() }).id
                      }
                    ]

                    const total = priceData[tokens[0].id].usd * tokens[0].balance + priceData[tokens[1].id].usd * tokens[1].balance

                    farm.lpContract.methods.balanceOf(bao.masterChefAddress).call().then((tvl) => {
                      const tvlDecimated = new BigNumber(tvl).div(new BigNumber(10).pow(18))

                      if (farm.poolType && farm.poolType === 'sushi') {
                        const lpContractXdai = new bao.web3.eth.Contract(erc20Abi, farm.lpTokenAddress)
                        lpContractXdai.methods.totalSupply().call().then((totalSupplyRaw) => {
                          const totalSupply = new BigNumber(totalSupplyRaw).div(new BigNumber(10).pow(18))
                          lpContract.methods.totalSupply().call().then((totalSupplyMainnetRaw) => {
                            const totalSupplyMainnet = new BigNumber(totalSupplyMainnetRaw).div(new BigNumber(10).pow(18))

                            resolve({
                              pid: farm.pid,
                              poolType: farm.poolType,
                              total: total * totalSupply.div(totalSupplyMainnet).toNumber(),
                              tokens: tokens,
                              mainnetSupply: totalSupplyMainnet,
                              mainnetTotal: total
                            })
                          })
                        })
                      } else {
                        resolve({
                          pid: farm.pid,
                          poolType: farm.poolType,
                          total: total,
                          tokens: tokens
                        })
                      }
                    })
                  })
                })
              })
            })
          })
        })
      })
    }
  })
}

const useAllFarmTVL = () => {
  const [totalLocked, setTotalLocked] = useState(-1)
  const ethereum = useWallet()
  const { account } = ethereum
  const bao = useBao()
  const web3 = useMainnetWeb3()
  const farms = getFarms(bao)
  const block = useBlock()
  const masterChefContract = getMasterChefContract(bao)
  const priceData = usePriceData(farms)

  const fetchAllLocked = useCallback(async () => {
    if (priceData !== -1) {
      var promises = []
      _.each(farms, (farm) => {
        promises.push(new Promise((resolve, reject) => {
          fetchTotalLocked(farm, priceData, bao, web3).then((data) => resolve(data))
            .catch(() => resolve(undefined))
        }))
      })
      Promise.all(promises).then((result) => {
        let sushiLPTotal = 0.0
        let baoLPTotal = 0.0

        _.each(result, (pool) => {
          if (pool) {
            if (pool.poolType && pool.poolType === 'sushi') sushiLPTotal += pool.total
            else baoLPTotal += pool.total
          }
        })

        setTotalLocked({
          poolValues: result,
          sushiLPTvlUsd: sushiLPTotal,
          baoLPTvlUsd: baoLPTotal
        })
      })
    }
  }, [account, bao, masterChefContract, priceData])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchAllLocked()
    }
  }, [account, bao, masterChefContract, priceData])

  return totalLocked
}

export default useAllFarmTVL
