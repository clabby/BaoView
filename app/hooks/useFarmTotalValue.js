import { useCallback, useEffect, useState, useMemo } from 'react';
import { BigNumber } from 'bignumber.js';
import _ from 'underscore';

import cgList from '../lib/cg-list.json';
import erc20Abi from '../lib/bao/lib/abi/erc20.json';

import useBao from './useBao';

const useFarmTotalValue = (farm, priceData) => {
  const bao = useBao();
  const [totalValue, setTotalValue] = useState(-1);

  const fetchLPValue = useCallback(async () => {
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
                        balance: reserves["_reserve1"] / (10 ** parseInt(decimals1)),
                        decimals: decimals1,
                        symbol: symbol1,
                        id: symbol1.toLowerCase() === 'bao.cx' ?
                          'bao-finance' : symbol1.toLowerCase() === 'wxdai' ? 'xdai' :
                          _.findWhere(cgList, { symbol: symbol1.toLowerCase() }).id
                      }
                    ]

                    const total = priceData[tokens[0].id].usd * tokens[0].balance + priceData[tokens[1].id].usd * tokens[1].balance;
                    setTotalValue({
                      total: total,
                      tokens: tokens
                    });
                  })
                })
              })
            })
          });
        });
      });
    }
  }, []);

  useMemo(() => {
    fetchLPValue();
  }, []);

  return totalValue;
};

export default useFarmTotalValue;
