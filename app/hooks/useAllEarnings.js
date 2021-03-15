import { useCallback, useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';

import { getEarned, getMasterChefContract, getFarms } from '../lib/bao/utils';
import useBao from './useBao';
import useBlock from './useBlock';

const useAllEarnings = () => {
  const [balances, setBalance] = useState([]);
  const ethereum = useWallet();
  const { account } = ethereum;
  const bao = useBao();
  const farms = getFarms(bao);
  const block = useBlock();
  const masterChefContract = getMasterChefContract(bao);

  const fetchAllBalances = useCallback(async () => {
    const balances = await Promise.all(
      farms.map(({ pid }) => getEarned(masterChefContract, pid, account)),
    );
    setBalance(balances);
  }, [account, masterChefContract, bao]);

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchAllBalances();
    }
  }, [account, masterChefContract, block, setBalance, bao]);

  return balances;
};

export default useAllEarnings;
