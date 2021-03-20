import { useCallback, useEffect, useState } from 'react';
import { provider } from 'web3-core';

import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';
import { Contract } from 'web3-eth-contract';

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../lib/bao/utils';
import useBao from './useBao';
import useBlock from './useBlock';

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([]);
  const ethereum = useWallet();
  const { account } = ethereum;
  const bao = useBao();
  const farms = getFarms(bao);
  const masterChefContract = getMasterChefContract(bao);
  const wethContract = getWethContract(bao);
  const block = useBlock();

  const fetchAllStakedValue = useCallback(async () => {
    const balances = await Promise.all(
      farms.map(({ pid, lpContract, tokenContract, tokenDecimals }) =>
        getTotalLPWethValue(
          masterChefContract,
          wethContract,
          lpContract,
          tokenContract,
          tokenDecimals,
          pid,
        ),
      ),
    );

    setBalance(balances);
  }, [account, masterChefContract, bao]);

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchAllStakedValue();
    }
  }, [account, block, masterChefContract, setBalance, bao]);

  return balances;
};

export default useAllStakedValue;