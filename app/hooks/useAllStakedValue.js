import { useCallback, useState, useMemo } from 'react';

import { useWallet } from 'use-wallet';

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../lib/bao/utils';
import useBao from './useBao';

const useAllStakedValue = () => {
  const [allStakedValue, setAllStakedValue] = useState([]);
  const ethereum = useWallet();
  const { account } = ethereum;
  const bao = useBao();
  const farms = getFarms(bao);
  const masterChefContract = getMasterChefContract(bao);
  const wethContract = getWethContract(bao);

  const fetchAllStakedValue = useCallback(async () => {
    const stakedValue = await Promise.all(
      farms.map(({ pid, lpContract, tokenContract, tokenDecimals }) =>
        getTotalLPWethValue(
          bao,
          masterChefContract,
          wethContract,
          lpContract,
          tokenContract,
          tokenDecimals,
          pid,
          account,
        ),
      ),
    );
    setAllStakedValue(stakedValue);
  }, [account, masterChefContract, bao]);

  useMemo(() => {
    if (account && masterChefContract && bao) {
      fetchAllStakedValue();
    }
  }, [account, masterChefContract, setAllStakedValue, bao]);

  return allStakedValue;
};

export default useAllStakedValue;
