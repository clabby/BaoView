import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import _ from 'underscore'

import { getEarned, getMasterChefContract, getFarms } from '../lib/bao/utils'
import useBao from './useBao'
import useBlock from './useBlock'

const useStakedTVL = (pid) => {
  const [staked, setStaked] = useState(-1)
  const ethereum = useWallet()
  const { account } = ethereum
  const bao = useBao()
  const farms = getFarms(bao)
  const block = useBlock()
  const masterChefContract = getMasterChefContract(bao)

  const fetchStaked = useCallback(async () => {
    const farm = _.findWhere(farms, { pid: pid })

    const staked = new BigNumber(await farm.lpContract.methods
      .balanceOf(bao.masterChefAddress).call())
      .div(new BigNumber(10).pow(18))

    setStaked(staked)
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchStaked()
    }
  }, [account, masterChefContract, block, setStaked, bao])

  return staked
}

export default useStakedTVL
