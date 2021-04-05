import { useCallback, useEffect, useState, useMemo } from 'react'
import { BigNumber } from 'bignumber.js'
import _ from 'underscore'

import { getMasterChefContract, getBaoPrice, getPoolWeight } from '../lib/bao/utils'

import useBao from './useBao'
import useBlock from './useBlock'

const BLOCKS_PER_YEAR = new BigNumber(6311390)
const BLOCKS_PER_MONTH = new BigNumber(525600)
const BLOCKS_PER_WEEK = new BigNumber(120960)

const useROI = (pid, baoPrice, tvlUsd, isLoading) => {
  const [roi, setRoi] = useState(-1)
  const bao = useBao()
  const block = useBlock()

  const fetchPriceData = useCallback(async () => {
    if (tvlUsd === -1) return

    const masterChef = getMasterChefContract(bao)
    const rewardPerBlock = new BigNumber(await masterChef.methods.getNewRewardPerBlock(pid + 1).call())
      .div(new BigNumber(10).pow(18))
    const poolWeight = await getPoolWeight(masterChef, pid)
    const poolInfo = await masterChef.methods.poolInfo(pid).call()

    /* testing:
    if (pid === 41 || pid === 1) {
      console.log('-------------------------')
      console.log(masterChef);
      console.log('block: ' + block)
      console.log('pid: ' + pid)
      console.log('weight: ' + poolWeight.toNumber())
      console.log('reward per block: ' + rewardPerBlock.toNumber())
      console.log('bao price: ' + baoPrice.toNumber())
      console.log('tvl: ' + tvlUsd.toNumber())
      console.log('apy: ' + baoPrice
        .times(rewardPerBlock)
        .times(BLOCKS_PER_YEAR)
        .div(tvlUsd)
        .times(100))
      console.log('apm: ' + baoPrice
        .times(rewardPerBlock)
        .times(BLOCKS_PER_MONTH)
        .div(tvlUsd)
        .times(100))
      console.log('apw: ' + baoPrice
        .times(rewardPerBlock)
        .times(BLOCKS_PER_WEEK)
        .div(tvlUsd)
        .times(100))
      console.log('-------------------------')
    } */

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
        .times(100)
    })
  }, [isLoading, block])

  useMemo(() => {
    fetchPriceData();
  }, [isLoading, block])

  return roi
};

export default useROI
