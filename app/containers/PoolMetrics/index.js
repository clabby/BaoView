/**
 * Pool Metrics Page
 */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import _ from 'underscore'

import CandleStickChart from './components/CandleStickChart/Loadable'

import { Container, Badge, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useWallet from 'use-wallet'
import useBao from '../../hooks/useBao'
import { getFarms } from '../../lib/bao/utils'

import {
  PoolMetricsContainer,
  PoolMetricsContent,
  AlertInfo,
  PoolTitle,
  PoolSubtitle
} from './styles/styled'

import '../HomePage/styles/poolicons.scss'

export default function PoolMetrics(_params) {
  const params = _params.match.params
  const { pid } = params

  const ethereum = useWallet()
  const bao = useBao()
  const farms = getFarms(bao)

  useEffect(() => {
    if (ethereum && ethereum.status !== 'connected') ethereum.connect()
  }, [])

  let farm
  if (farms.length > 0) farm = _.findWhere(farms, { pid: parseInt(pid) })

  return (
    <PoolMetricsContainer>
      <PoolMetricsContent>
        {ethereum.status !== 'connected' ? (
          <h1>Connect your wallet to view Pool Metrics!</h1>
        ) : farms.length === 0 ? (
          <h1>Loading...</h1>
        ) : farm === undefined ? (
          window.location.href = '/404'
        ) : (
          <>
            <Alert variant="warning">
              <Badge variant="warning">DISCLAIMER</Badge>
              <br />
              The data displayed is collected by a college student.
              <br />
              This resource is for educational purposes only.
              Please do not use this data for financial decisions as there may be discrepancies.
            </Alert>
            <AlertInfo>
              <Badge variant="info">INFO</Badge>
              <br />
              <b>APY</b> is calculated using the following formula:
              <br />
              <b>((bao_price_usd * rewards_per_block * blocks_per_year) / (total_value_locked_usd)) * 100.0</b>
              <hr />
              <b>bao_price_usd</b> is provided by CoinGecko, <b>rewards_per_block</b> is received from the master farmer contract,{' '}
              <b>blocks_per_year</b> is constant at <code>6311390</code> for xDai, and <b>total_value_locked_usd</b> is received from the LP contract.
            </AlertInfo>
            <h1 className="mt-4 mb-4">
              <div className={'pool-icon ' + farm.icon.split('/')[1].split('.')[0]} />
              <PoolTitle>
                {farm.name}
                <br />
                <PoolSubtitle>
                  <Badge variant="secondary">
                    {farm.id}
                  </Badge>
                </PoolSubtitle>
                <br/>
                <PoolSubtitle>
                  Pool Metrics{' '}
                  <FontAwesomeIcon icon={['fas', 'chart-line']} />
                </PoolSubtitle>
              </PoolTitle>
            </h1>
            <CandleStickChart title="Pool APY (%)" pid={pid} />
            <hr />
            <CandleStickChart title="Total Value Locked (USD)" pid={pid} />
            <hr />
            <CandleStickChart title="Bao.cx yield per day, per $1000 staked" pid={pid} />
          </>
        )}
      </PoolMetricsContent>
    </PoolMetricsContainer>
  )
}
