import { useCallback, useEffect, useState, useMemo } from 'react';

import { BigNumber } from 'bignumber.js';
import { useWallet } from 'use-wallet';

import { getStaked, getMasterChefContract, getFarms } from '../lib/bao/utils';
import useBao from './useBao';
import useBlock from './useBlock';

const useAllStakedBalance = () => {
  const [balance, setBalance] = useState([]);
  const ethereum = useWallet();
  const { account } = ethereum;
  const bao = useBao();
  const masterChefContract = getMasterChefContract(bao);
  const block = useBlock();
  const farms = getFarms(bao);

  const fetchBalance = useCallback(async () => {
    const balances = await Promise.all(
      farms.map(({ pid }) => getStaked(masterChefContract, pid, account)),
    );

    setBalance(balances);
  }, [account, bao]);

  useMemo(() => {
    if (account && bao) {
      fetchBalance();
    }
  }, [account, setBalance, bao]);

  return balance;
};

export default useAllStakedBalance;
