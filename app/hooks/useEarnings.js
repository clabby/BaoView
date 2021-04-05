import { useCallback, useEffect, useState, useMemo } from 'react';
import { provider } from 'web3-core';

import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';

import { getEarned, getMasterChefContract } from '../lib/bao/utils';
import useBao from './useBao';
import useBlock from './useBlock';

const useEarnings = pid => {
  const [balance, setBalance] = useState(-1);
  const ethereum = useWallet();
  const { account } = ethereum;
  const bao = useBao();
  const masterChefContract = getMasterChefContract(bao);
  const block = useBlock();

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account);
    setBalance(new BigNumber(balance));
  }, [account, masterChefContract, bao]);

  useMemo(() => {
    if (account && masterChefContract && bao) {
      fetchBalance();
    }
  }, [account, block, masterChefContract, setBalance, bao]);

  return balance;
};

export default useEarnings;
