import { useCallback, useState, useMemo } from 'react';
import { BigNumber } from 'bignumber.js';

import { getMasterChefContract } from '../lib/bao/utils';

import useBao from './useBao';

const BLOCKS_PER_YEAR = new BigNumber(6311390);
const BLOCKS_PER_MONTH = new BigNumber(525600);
const BLOCKS_PER_WEEK = new BigNumber(120960);

const useROI = (pid, baoPrice, tvlUsd, isLoading) => {
  const [roi, setRoi] = useState(-1);
  const bao = useBao();

  const fetchPriceData = useCallback(async () => {
    if (tvlUsd === -1) return;

    const masterChef = getMasterChefContract(bao);
    const rewardPerBlock = new BigNumber(
      await masterChef.methods.getNewRewardPerBlock(pid + 1).call(),
    ).div(new BigNumber(10).pow(18));

    setRoi({
      apy: baoPrice
        .times(rewardPerBlock)
        .times(BLOCKS_PER_YEAR)
        .div(tvlUsd)
        .times(100),
      apm: baoPrice
        .times(rewardPerBlock)
        .times(BLOCKS_PER_MONTH)
        .div(tvlUsd)
        .times(100),
      apw: baoPrice
        .times(rewardPerBlock)
        .times(BLOCKS_PER_WEEK)
        .div(tvlUsd)
        .times(100),
    });
  }, [isLoading]);

  useMemo(() => {
    fetchPriceData();
  }, [isLoading]);

  return roi;
};

export default useROI;
