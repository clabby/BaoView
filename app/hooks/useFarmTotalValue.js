import { useCallback, useState, useMemo } from 'react';
import { BigNumber } from 'bignumber.js';
import _ from 'underscore';

import useBao from './useBao';
import useMainnetWeb3 from './useMainnet';

import { decimate } from '../lib/formatBalance';

import cgList from '../lib/cg-list.json';
import erc20Abi from '../lib/bao/lib/abi/erc20.json';
import lpAbi from '../lib/bao/lib/abi/uni_v2_lp.json';

const useFarmTotalValue = (farm, priceData) => {
  const bao = useBao();
  const web3 = useMainnetWeb3();
  const [totalValue, setTotalValue] = useState(-1);

  const fetchLPValue = useCallback(async () => {
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
          id: _.findWhere(cgList, { symbol: symbol0.toLowerCase() }).id,
        },
        {
          // eslint-disable-next-line no-underscore-dangle,radix
          balance: reserves._reserve1 / 10 ** parseInt(decimals1),
          decimals: decimals1,
          symbol: symbol1,
          id: _.findWhere(cgList, { symbol: symbol1.toLowerCase() }).id,
        },
      ];

      const total =
        priceData[tokens[0].id].usd * tokens[0].balance +
        priceData[tokens[1].id].usd * tokens[1].balance;

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

        setTotalValue({
          total: total * totalSupply.div(totalSupplyMainnet).toNumber(),
          tokens,
          mainnetSupply: totalSupplyMainnet,
          mainnetTotal: total,
        });
      } else {
        setTotalValue({
          total,
          tokens,
        });
      }
    }
  }, []);

  useMemo(() => {
    fetchLPValue();
  }, []);

  return totalValue;
};

export default useFarmTotalValue;
