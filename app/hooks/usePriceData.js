import { useCallback, useEffect, useState } from 'react'
import { BigNumber } from 'bignumber.js'
import _ from 'underscore'

import cgList from '../lib/cg-list.json'
import erc20Abi from '../lib/bao/lib/abi/erc20.json'

import useBao from './useBao'

const usePriceData = (farms) => {
  const [priceData, setPriceData] = useState(-1)

  const fetchPriceData = useCallback(async () => {
    const tokenIds = []

    farms.forEach((farm) => {
      const tokens = farm.id.split(' ')[0].split('-')
      const a = _.findWhere(cgList, {symbol: tokens[0].toLowerCase()})
      const b = _.findWhere(cgList, {symbol: tokens[1].toLowerCase()})

      if (a && b) {
        if (!_.contains(tokenIds, a.id)) tokenIds.push(a.id)
        if (!_.contains(tokenIds, b.id)) tokenIds.push(b.id)
      }
    })

    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=' + tokenIds.join(',') +
      '&vs_currencies=usd&include_24hr_change=true',
    ).then(response => response.json())
    .then(priceData => {
      setPriceData(priceData)
    })
  }, [])

  useEffect(() => {
    fetchPriceData()
  }, [])

  return priceData
}

export default usePriceData
