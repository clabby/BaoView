import { useCallback, useState, useMemo } from 'react';

import { useWallet } from 'use-wallet';

import { getEarned, getMasterChefContract, getFarms } from '../lib/bao/utils';
import useBao from './useBao';
import useBlock from './useBlock';

const useAllEarnings = () => {
  const [earnings, setEarnings] = useState([]);
  const ethereum = useWallet();
  const { account } = ethereum;
  const bao = useBao();
  const farms = getFarms(bao);
  const block = useBlock();
  const masterChefContract = getMasterChefContract(bao);

  const fetchAllEarnings = useCallback(async () => {
    const fetchedEarnings = await Promise.all(
      farms.map(({ pid }) => getEarned(masterChefContract, pid, account)),
    );
    setEarnings(fetchedEarnings);
  }, [account, masterChefContract, bao]);

  useMemo(() => {
    if (account && masterChefContract && bao) {
      fetchAllEarnings();
    }
  }, [account, masterChefContract, block, setEarnings, bao]);

  return earnings;
};

export default useAllEarnings;
