/**
 * Pool Metrics Page
 */

import React from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import CandleStickChart from './components/CandleStickChart/Loadable';

import { Container, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useWallet from 'use-wallet';
import useBao from '../../hooks/useBao';
import { getFarms } from '../../lib/bao/utils';

import './styles/poolmetrics.scss';

export default function PoolMetrics(_params) {
  const params = _params.match.params;
  const { pid } = params;

  const ethereum = useWallet();
  const bao = useBao();
  const farms = getFarms(bao);

  let farm;
  if (farms.length > 0) farm = _.findWhere(farms, { pid: parseInt(pid) });

  return (
    <Container id="pool-metrics">
      <div id="pool-metrics-content">
        <div className="alert alert-warning">
          <Badge variant="warning">DISCLAIMER</Badge>
          <br/>
          The data displayed is collected by me, a college student.
          <br/>
          This resource is for educational purposes only.
          Please do not use this data for financial decisions as there may be discrepancies.
        </div>
        <div className="alert alert-info">
          <Badge variant="info">INFO</Badge>
          <br/>
          Total Pool Value is provided by BlockScout, while APY is calculated using the following formula:
          <br/>
          <b>((bao_price_usd * bao_per_block * blocks_per_year * pool_weight) / (total_pool_value_usd)) * 100.0</b>
        </div>
        {ethereum.status !== 'connected' ? (
          <h1>Please connect your wallet to view Pool Metrics.</h1>
        ) : farms.length === 0 ? (
          <h1>Loading...</h1>
        ) : farm === undefined ? (
          window.location.href = '/404'
        ) : (
          <div>
            <h1>{farm.name} Pool Metrics</h1>
            <hr />
            <CandleStickChart title="Pool APY (%)" pid={pid} />
            <hr />
            <CandleStickChart title="Total Pool Value (USD)" pid={pid} />
          </div>
        )}
      </div>
    </Container>
  )
}
