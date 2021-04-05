import { useCallback, useEffect, useState, useMemo } from 'react';
import { BigNumber } from 'bignumber.js';

import _ from 'underscore';

import useAllStakedValue from './useAllStakedValue';
import useAllStakedBalance from './useAllStakedBalance';

import useBao from './useBao';
import usePriceData from './usePriceData';
import { getFarms } from '../lib/bao/utils';

import cgList from '../lib/cg-list.json';
import erc20Abi from '../lib/bao/lib/abi/erc20.json';

const fetchPoolTotalValue = async (farm, priceData, cb) => {
  if (priceData !== -1) {
    const lpContract = farm.lpContract;

    lpContract.methods.getReserves().call().then(reserves => {
      lpContract.methods.token0().call().then(tokenAddress0 => {
        lpContract.methods.token1().call().then(tokenAddress1 => {
          const token0Contract = new bao.web3.eth.Contract(erc20Abi, tokenAddress0)
          const token1Contract = new bao.web3.eth.Contract(erc20Abi, tokenAddress1)
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
                      balance: reserves["_reserve1"] / (10 ** parseInt(decimals0)),
                      decimals: decimals1,
                      symbol: symbol1,
                      id: symbol1.toLowerCase() === 'bao.cx' ?
                        'bao-finance' : symbol1.toLowerCase() === 'wxdai' ? 'xdai' :
                        _.findWhere(cgList, { symbol: symbol1.toLowerCase() }).id
                    }
                  ]

                  const total = priceData[tokens[0].id].usd * tokens[0].balance + priceData[tokens[1].id].usd * tokens[1].balance;
                  cb(total);
                })
              })
            })
          })
        });
      });
    });
  }
};

const useLPTotalUSDValue = () => {
  const [totalValue, setTotalValue] = useState(-1);

  const stakedValues = useAllStakedValue();
  const stakedBalances = useAllStakedBalance();

  const bao = useBao();
  let farms = getFarms(bao);
  const priceData = usePriceData(farms);

  const fetchLPValue = useCallback(async () => {
    const promises = [];
    if (priceData !== -1) {
      if (stakedValues.length > 0 && stakedBalances.length > 0) {
        // Filter farms that we are staked in
        const stakedPools = _.filter(farms, (farm) => {
          const cStakedValue = _.findWhere(stakedValues, { pid: farm.pid });

          if (cStakedValue.staked.amount > 0) {
            return farm;
          }
        });

        stakedPools.forEach((farm, i) => {
          promises.push(new Promise((resolve, reject) => {
            fetchPoolTotalValue(farm, priceData, (data) => {
              const stakedValue = _.findWhere(stakedValues, {pid: farm.pid});
              const totalSupply = new BigNumber(stakedValue.totalSupply).div(new BigNumber(10).pow(18));
              resolve((new BigNumber(stakedValue.staked.amount).div(new BigNumber(10).pow(18)))
                .div(totalSupply)
                .times(new BigNumber(data)).toNumber());
            });
          }));
        });

        Promise.all(promises).then(data => {
          let sum = 0.0;
          _.each(data, (num) => sum += num);

          setTotalValue(sum);
        })
      }
    }
  }, [stakedBalances, stakedValues, priceData]);

  useMemo(() => {
    fetchLPValue();
  }, [stakedValues, stakedBalances, priceData]);

  return totalValue;
};

export default useLPTotalUSDValue;
