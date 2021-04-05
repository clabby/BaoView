import { useCallback, useEffect, useState, useMemo } from 'react'

import { BigNumber } from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../lib/bao/utils'
import useBao from './useBao'
import useBlock from './useBlock'

const useStakedBalance = pid => {
  const [balance, setBalance] = useState(new BigNumber(-1))
  const ethereum = useWallet()
  const { account } = ethereum
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)
  const block = useBlock()
  let userBalance

  const fetchBalance = useCallback(async () => {
    BigNumber.config({ DECIMAL_PLACES: 18 })
    const balance = await getStaked(masterChefContract, pid, account)
    userBalance = new BigNumber(balance)
    setBalance(userBalance.decimalPlaces(18))
  }, [account, pid, bao])

  useMemo(() => {
    if (account && bao) {
      fetchBalance()
    }
  }, [account, pid, setBalance, bao])

  return balance.decimalPlaces(18)
};

export default useStakedBalance
