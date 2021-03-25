/**
 * Pool Metrics Page
 */

import React from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import CandleStickChart from './components/CandleStickChart';

import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useWallet from 'use-wallet';
import useBao from '../../hooks/useBao';
import { getFarms } from '../../lib/bao/utils';

import './styles/poolmetrics.scss';

export default function PoolMetrics(_params) {
  console.log(_params);
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
        {ethereum.status !== 'connected' ? (
          <h1>Please connect your wallet to view Pool Metrics.</h1>
        ) : farms.length === 0 ? (
          <h1>Loading...</h1>
        ) : farm === undefined ? (
          window.location.href = '/404'
        ) : (
          <div>
            <div className="alert alert-warning">
              <b>Notice: </b>
              Pool Metrics have not yet been implemented. The data displayed in charts is placeholder data.
            </div>
            <h1>{farm.name} Pool Metrics</h1>
            <hr />
            <CandleStickChart title="Pool APY" pid={pid} />
            <hr />
            <CandleStickChart title="Total Pool Value" pid={pid} />
          </div>
        )}
      </div>
    </Container>
  )
}
