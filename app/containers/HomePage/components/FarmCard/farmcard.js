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
  Popover,
  Badge
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStakedBalance from '../../../../hooks/useStakedBalance';
import useEarnings from '../../../../hooks/useEarnings';
import { getBalanceNumber } from '../../../../lib/formatBalance';

export default function FarmCard(props) {
  const { pool, roi, stakedValue } = props;
  const stakedBalance = useStakedBalance(pool.pid);
  const pendingBao = useEarnings(pool.pid);

  let poolValue = -1;
  let totalSupply = -1;
  let lpValueUSD = -1;
  if (stakedValue && stakedBalance) {
    totalSupply = new BigNumber(stakedValue.totalSupply).div(new BigNumber(10).pow(18))
    lpValueUSD = (stakedBalance.div(new BigNumber(10).pow(18)))
      .div(totalSupply)
      .times(new BigNumber(stakedValue.totalWethValue));
    poolValue = stakedValue.totalWethValue;
  }

  const popover = (
    <Popover>
      <Popover.Title as="h3">Pool Info ({pool.lpToken})</Popover.Title>
      <Popover.Content>
        Pool Value
        <br/>
        <Badge variant="success" pill>
          {poolValue === -1
            ? 'Loading...' :
            '$' + getBalanceNumber(poolValue, 0)}
        </Badge>
        <hr/>
        Supply
        <br/>
        <span>
          {totalSupply === -1
            ? 'Loading...' :
            getBalanceNumber(totalSupply, 0) + ' LP'}
        </span>
        <hr/>
        Your Share
        <br/>
        <span>
          {totalSupply === -1
            ? 'Loading...' :
            stakedBalance.div(new BigNumber(10).pow(18)).div(totalSupply).times(100).toNumber().toFixed(6) + '%'}
        </span>
      </Popover.Content>
    </Popover>
  );

  const PoolData = () => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <ListGroup.Item style={{textAlign: 'center'}}>
        <a role="button">
          Pool Info (Click)
        </a>
      </ListGroup.Item>
    </OverlayTrigger>
  );

  return (
    <div className="col-4">
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <div variant="top" className={`${pool.icon.split('/')[1].split('.')[0]} pool-icon`} />
          <Card.Title>
            {pool.name}
            <br />
            <small>{pool.lpToken}</small>
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
            LP Value
            <span>
              {lpValueUSD === -1 ?
                'Loading...' :
                '$' + getBalanceNumber(lpValueUSD, 0)
              }
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Pending BAO
            <span>
              {pendingBao === null
                ? 'Loading...'
                : getBalanceNumber(pendingBao)}
            </span>
          </ListGroup.Item>
          <PoolData />
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
