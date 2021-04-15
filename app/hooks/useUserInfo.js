import { useCallback, useState, useMemo } from 'react';
import _ from 'underscore';

import { useWallet } from 'use-wallet';

import { getUserInfo, getMasterChefContract } from '../lib/bao/utils';
import useBao from './useBao';

const BLOCKS_PER_SECOND = 5;

const getCurrentBlock = () =>
  new Promise((resolve, reject) => {
    fetch(
      'https://blockscout.com/poa/xdai/api?module=block&action=eth_block_number',
    )
      .then(response => response.json())
      .then(blockData => {
        resolve(parseInt(blockData.result, 16));
      })
      .catch(err => reject(err));
  });

const useUserInfo = pid => {
  const [userInfo, setUserInfo] = useState(undefined);
  const ethereum = useWallet();
  const { account } = ethereum;
  const bao = useBao();
  const masterChefContract = getMasterChefContract(bao);

  const fetchUserInfo = useCallback(async () => {
    const fetchedUserInfo = await getUserInfo(masterChefContract, pid, account);
    const block = await getCurrentBlock();

    const transactionBlocks = [
      fetchedUserInfo.firstDepositBlock,
      fetchedUserInfo.lastWithdrawBlock,
    ];
    const greatestBlock = _.max(transactionBlocks);
    const blockDiff = block - greatestBlock;

    const timeDiff = new Date(
      new Date() - 1000 * ((block - greatestBlock) * BLOCKS_PER_SECOND),
    );

    /* eslint-disable */
    const fee =
      blockDiff === 0
        ? 0.25
        : blockDiff >= 1 && blockDiff <= 721
        ? 0.08
        : blockDiff >= 722 && blockDiff <= 17280
        ? 0.04
        : blockDiff >= 17281 && blockDiff <= 51840
        ? 0.02
        : blockDiff >= 51841 && blockDiff <= 86400
        ? 0.01
        : blockDiff >= 86401 && blockDiff <= 242000
        ? 0.005
        : blockDiff >= 242001 && blockDiff <= 483800
        ? 0.0025
        : 0.001;

    setUserInfo({
      max: greatestBlock,
      currentBlock: block,
      firstDepositDate: fetchedUserInfo.firstDepositBlock === '0' ? 'N/A' : new Date(
        new Date() - (1000 * ((block - fetchedUserInfo.firstDepositBlock) * BLOCKS_PER_SECOND))
      ),
      lastDepositDate: fetchedUserInfo.lastDepositBlock === '0' ? 'N/A' : new Date(
        new Date() - (1000 * ((block - fetchedUserInfo.lastDepositBlock) * BLOCKS_PER_SECOND))
      ),
      lastWithdrawDate: fetchedUserInfo.lastWithdrawBlock === '0' ? 'N/A' : new Date(
        new Date() - (1000 * ((block - fetchedUserInfo.lastWithdrawBlock) * BLOCKS_PER_SECOND))
      ),
      timeDiff,
      fee,
    });
    /* eslint-enable */
  }, [account, pid, bao]);

  useMemo(() => {
    if (account && bao) {
      fetchUserInfo();
    }
  }, [account, pid, bao]);

  return userInfo;
};

export default useUserInfo;
