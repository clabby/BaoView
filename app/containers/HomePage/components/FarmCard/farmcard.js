import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BigNumber from 'bignumber.js';

import '../../styles/homepage.scss';
import '../../styles/poolicons.scss';

import {
  Card,
  Button,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStakedBalance from '../../../../hooks/useStakedBalance';
import useEarnings from '../../../../hooks/useEarnings';
import { getBalanceNumber } from '../../../../lib/formatBalance';

export default function FarmCard(props) {
  const { pool, roi } = props;
  const stakedBalance = useStakedBalance(pool.pid);
  const pendingBao = useEarnings(pool.pid);

  return (
    <div className="col-4">
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <div variant="top" className={`${pool.iconClass} pool-icon`} />
          <Card.Title>
            {pool.name}
            <br />
            <small>{`${pool.symbol.split(' ')[0]} Pair`}</small>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Coming Soon!</Tooltip>}
            >
              <div>
                <Button variant="info" href="#" className="mt-2 disabled">
                  <FontAwesomeIcon icon={['fa', 'chart-line']} /> Pool Metrics
                </Button>
              </div>
            </OverlayTrigger>
          </Card.Title>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            LP Staked
            <span>
              {stakedBalance.toNumber() === -1
                ? 'Loading...'
                : getBalanceNumber(stakedBalance)}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            LP Value (USD)
            <span>N/A</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Pending BAO
            <span>
              {pendingBao === null
                ? 'Loading...'
                : getBalanceNumber(pendingBao)}
            </span>
          </ListGroup.Item>
          <ListGroup.Item style={{ textAlign: 'center' }}>
            ROI (week/month/year)
            <br />
            {roi ? (
              <b>
                {roi.apw === null ||
                roi.apw.toNumber() === Number.POSITIVE_INFINITY
                  ? '...'
                  : `${roi.apw
                      .times(new BigNumber(100))
                      .toNumber()
                      .toFixed(2)}%`}
                {' / '}
                {roi.apm === null ||
                roi.apm.toNumber() === Number.POSITIVE_INFINITY
                  ? '...'
                  : `${roi.apm
                      .times(new BigNumber(100))
                      .toNumber()
                      .toFixed(2)}%`}
                {' / '}
                {roi.apy === null ||
                roi.apy.toNumber() === Number.POSITIVE_INFINITY
                  ? '...'
                  : `${roi.apy
                      .times(new BigNumber(100))
                      .toNumber()
                    .toFixed(2)}%`}
              </b>
            ) : (
              <b>Loading...</b>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

FarmCard.propTypes = {
  pool: PropTypes.object,
  roi: PropTypes.object,
};

FarmCard.defaultProps = {
  pool: null,
  roi: null,
};
