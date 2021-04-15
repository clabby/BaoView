import { useCallback, useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';

import { getLockedEarned, getBaoContract } from '../lib/bao/utils';
import useBao from './useBao';

const useLockedEarnings = () => {
  const [earnings, setEarnings] = useState(new BigNumber(-1));
  const ethereum = useWallet();
  const { account } = ethereum;
  const bao = useBao();
  const baoContract = getBaoContract(bao);

  const fetchEarnings = useCallback(async () => {
    const fetchedEarnings = await getLockedEarned(baoContract, account);
    setEarnings(new BigNumber(fetchedEarnings));
  }, [account, baoContract, bao]);

  useEffect(() => {
    if (account && baoContract && bao) {
      fetchEarnings();
    }
  }, [account, baoContract, setEarnings, bao]);

  return earnings;
};

export default useLockedEarnings;
