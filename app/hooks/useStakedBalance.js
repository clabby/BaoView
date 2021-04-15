import { useCallback, useState, useMemo } from 'react';

import { BigNumber } from 'bignumber.js';
import { useWallet } from 'use-wallet';

import { getStaked, getMasterChefContract } from '../lib/bao/utils';
import useBao from './useBao';

const useStakedBalance = pid => {
  const [balance, setBalance] = useState(new BigNumber(-1));
  const ethereum = useWallet();
  const { account } = ethereum;
  const bao = useBao();
  const masterChefContract = getMasterChefContract(bao);

  const fetchBalance = useCallback(async () => {
    BigNumber.config({ DECIMAL_PLACES: 18 });
    const fetchedBalance = await getStaked(masterChefContract, pid, account);
    setBalance(new BigNumber(fetchedBalance).decimalPlaces(18));
  }, [account, pid, bao]);

  useMemo(() => {
    if (account && bao) {
      fetchBalance();
    }
  }, [account, pid, setBalance, bao]);

  return balance.decimalPlaces(18);
};

export default useStakedBalance;
