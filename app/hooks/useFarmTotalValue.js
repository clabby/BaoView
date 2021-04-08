import { useCallback, useEffect, useState, useMemo } from 'react'
import { BigNumber } from 'bignumber.js'
import _ from 'underscore'

import cgList from '../lib/cg-list.json'
import erc20Abi from '../lib/bao/lib/abi/erc20.json'

import useBao from './useBao'

import Web3 from 'web3'
import lpAbi from '../lib/bao/lib/abi/uni_v2_lp.json'

import { INFURA_URI } from '../../env.json'

const useFarmTotalValue = (farm, priceData) => {
  const bao = useBao()
  const [totalValue, setTotalValue] = useState(-1)

  const fetchLPValue = useCallback(async () => {
    if (priceData !== -1) {
      const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URI))
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
                        id: symbol0.toLowerCase() === 'bao.cx' ?
                          'bao-finance' : symbol0.toLowerCase() === 'wxdai' ? 'xdai' :
                          _.findWhere(cgList, { symbol: symbol0.toLowerCase() }).id
                      },
                      {
                        balance: reserves["_reserve1"] / (10 ** parseInt(decimals1)),
                        decimals: decimals1,
                        symbol: symbol1,
                        id: symbol1.toLowerCase() === 'bao.cx' ?
                          'bao-finance' : symbol1.toLowerCase() === 'wxdai' ? 'xdai' :
                          _.findWhere(cgList, { symbol: symbol1.toLowerCase() }).id
                      }
                    ]

                    if (farm.pid === 136) console.log(tokens)

                    const total = priceData[tokens[0].id].usd * tokens[0].balance + priceData[tokens[1].id].usd * tokens[1].balance

                    if (farm.poolType && farm.poolType === 'sushi') {
                      const lpContractXdai = new bao.web3.eth.Contract(erc20Abi, farm.lpTokenAddress)
                      lpContractXdai.methods.totalSupply().call().then((totalSupplyRaw) => {
                        const totalSupply = new BigNumber(totalSupplyRaw).div(new BigNumber(10).pow(18))
                        lpContract.methods.totalSupply().call().then((totalSupplyMainnetRaw) => {
                          const totalSupplyMainnet = new BigNumber(totalSupplyMainnetRaw).div(new BigNumber(10).pow(18))

                          setTotalValue({
                            total: total * totalSupply.div(totalSupplyMainnet).toNumber(),
                            tokens: tokens,
                            mainnetSupply: totalSupplyMainnet,
                            mainnetTotal: total
                          })
                        })
                      })
                    } else {
                      setTotalValue({
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
    }
  }, [])

  useMemo(() => {
    fetchLPValue()
  }, [])

  return totalValue
}

export default useFarmTotalValue
