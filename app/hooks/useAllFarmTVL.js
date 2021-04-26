import { useCallback, useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';

import _ from 'lodash';

import { getMasterChefContract, getFarms } from '../lib/bao/utils';
import useBao from './useBao';
import useMainnetWeb3 from './useMainnet';
import usePriceData from './usePriceData';

import { decimate } from '../lib/formatBalance';

import erc20Abi from '../lib/bao/lib/abi/erc20.json';
import lpAbi from '../lib/bao/lib/abi/uni_v2_lp.json';
import cgList from '../lib/cg-list.json';

const fetchTotalLocked = (farm, priceData, bao, web3) =>
  new Promise(async resolve => {
    if (priceData !== -1) {
      const lpContract =
        farm.poolType && farm.poolType === 'sushi'
          ? new web3.eth.Contract(lpAbi, farm.lpTokenAddressMainnet)
          : farm.lpContract;

      const [reserves, tokenAddress0, tokenAddress1] = await Promise.all([
        lpContract.methods.getReserves().call(),
        lpContract.methods.token0().call(),
        lpContract.methods.token1().call(),
      ]);

      const token0Contract =
        farm.poolType && farm.poolType === 'sushi'
          ? new web3.eth.Contract(erc20Abi, tokenAddress0)
          : new bao.web3.eth.Contract(erc20Abi, tokenAddress0);
      const token1Contract =
        farm.poolType && farm.poolType === 'sushi'
          ? new web3.eth.Contract(erc20Abi, tokenAddress1)
          : new bao.web3.eth.Contract(erc20Abi, tokenAddress1);

      const [symbol0, decimals0, symbol1, decimals1] = await Promise.all([
        token0Contract.methods.symbol().call(),
        token0Contract.methods.decimals().call(),
        token1Contract.methods.symbol().call(),
        token1Contract.methods.decimals().call(),
      ]);

      const tokens = [
        {
          // eslint-disable-next-line no-underscore-dangle,radix
          balance: reserves._reserve0 / 10 ** parseInt(decimals0),
          decimals: decimals0,
          symbol: symbol0,
          id: _.find(cgList, { symbol: symbol0.toLowerCase() }).id,
        },
        {
          // eslint-disable-next-line no-underscore-dangle,radix
          balance: reserves._reserve1 / 10 ** parseInt(decimals1),
          decimals: decimals1,
          symbol: symbol1,
          id: _.find(cgList, { symbol: symbol1.toLowerCase() }).id,
        },
      ];

      const total =
        priceData[tokens[0].id].usd * tokens[0].balance +
        priceData[tokens[1].id].usd * tokens[1].balance;

      const tvlRaw = await farm.lpContract.methods
        .balanceOf(bao.masterChefAddress)
        .call();
      const tvl = decimate(new BigNumber(tvlRaw));

      if (farm.poolType && farm.poolType === 'sushi') {
        const lpContractXdai = new bao.web3.eth.Contract(
          erc20Abi,
          farm.lpTokenAddress,
        );

        const [totalSupplyRaw, totalSupplyMainnetRaw] = await Promise.all([
          lpContractXdai.methods.totalSupply().call(),
          lpContract.methods.totalSupply().call(),
        ]);
        const totalSupply = decimate(new BigNumber(totalSupplyRaw));
        const totalSupplyMainnet = decimate(
          new BigNumber(totalSupplyMainnetRaw),
        );

        const adjTotal = total * totalSupply.div(totalSupplyMainnet).toNumber();

        resolve({
          pid: farm.pid,
          poolType: farm.poolType,
          total: adjTotal,
          tvl: (tvl / totalSupply) * adjTotal,
          tokens,
          mainnetSupply: totalSupplyMainnet,
          mainnetTotal: total,
        });
      } else {
        const totalSupplyRaw = await lpContract.methods.totalSupply().call();
        const totalSupply = decimate(new BigNumber(totalSupplyRaw));

        resolve({
          pid: farm.pid,
          poolType: farm.poolType,
          total,
          tvl: (tvl / totalSupply) * total,
          tokens,
        });
      }
    }
  });

const useAllFarmTVL = () => {
  const [totalLocked, setTotalLocked] = useState(-1);
  const ethereum = useWallet();
  const { account } = ethereum;
  const bao = useBao();
  const web3 = useMainnetWeb3();
  const farms = getFarms(bao);
  const masterChefContract = getMasterChefContract(bao);
  const priceData = usePriceData(farms);

  const fetchAllLocked = useCallback(async () => {
    if (priceData !== -1) {
      const promises = [];
      _.each(farms, farm => {
        if (farm.pid !== 136) {
          promises.push(
            new Promise(resolve => {
              fetchTotalLocked(farm, priceData, bao, web3)
                .then(data => resolve(data))
                .catch(() => resolve(undefined));
            }),
          );
        }
      });
      Promise.all(promises).then(result => {
        let sushiLPTotal = 0.0;
        let baoLPTotal = 0.0;

        _.each(result, pool => {
          if (pool) {
            if (pool.poolType && pool.poolType === 'sushi')
              sushiLPTotal += pool.tvl;
            else baoLPTotal += pool.tvl;
          }
        });

        setTotalLocked({
          poolValues: result,
          sushiLPTvlUsd: sushiLPTotal,
          baoLPTvlUsd: baoLPTotal,
        });
      });
    }
  }, [account, bao, masterChefContract, priceData]);

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchAllLocked();
    }
  }, [account, bao, masterChefContract, priceData]);

  return totalLocked;
};

export default useAllFarmTVL;
