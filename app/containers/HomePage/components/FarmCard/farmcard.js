import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import _ from 'underscore';

import BigNumber from 'bignumber.js';

import '../../styles/homepage.scss';
import '../../styles/poolicons.scss';

import {
  Card,
  Button,
  ListGroup,
  OverlayTrigger,
  Tooltip,
  Badge,
  Accordion
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import useStakedBalance from '../../../../hooks/useStakedBalance';
import useEarnings from '../../../../hooks/useEarnings';
import useFarmTotalValue from '../../../../hooks/useFarmTotalValue';
import { getBalanceNumber } from '../../../../lib/formatBalance';

const BLOCKS_PER_WEEK = new BigNumber(44923);
const BLOCKS_PER_MONTH = new BigNumber(194667);
const BLOCKS_PER_YEAR = new BigNumber(2336000);
const BAO_BER_BLOCK = new BigNumber(256000);

export default function FarmCard(props) {
  const { pool, stakedValue, priceData, baoPrice } = props;
  const stakedBalance = useStakedBalance(pool.pid);
  const pendingBao = useEarnings(pool.pid);

  const totalFarmValue = useFarmTotalValue(pool, priceData);

  let poolValue = -1;
  let totalSupply = -1;
  let lpValueUSD = -1;
  let roi = {
    apw: -1,
    apm: -1,
    apy: -1
  };
  
  if (stakedValue && stakedBalance && totalFarmValue >= 0) {
    totalSupply = new BigNumber(stakedValue.totalSupply).div(new BigNumber(10).pow(18));
    poolValue = new BigNumber(totalFarmValue);
    lpValueUSD = (stakedBalance.div(new BigNumber(10).pow(18)))
      .div(totalSupply)
      .times(poolValue);

    roi.apw = baoPrice
      .times(BAO_BER_BLOCK)
      .times(BLOCKS_PER_WEEK)
      .times(stakedValue.poolWeight)
      .div(poolValue);
    roi.apm = baoPrice
      .times(BAO_BER_BLOCK)
      .times(BLOCKS_PER_MONTH)
      .times(stakedValue.poolWeight)
      .div(poolValue);
    roi.apy = baoPrice
      .times(BAO_BER_BLOCK)
      .times(BLOCKS_PER_YEAR)
      .times(stakedValue.poolWeight)
      .div(poolValue);
  }

  const PoolDataToggle = ({ children, eventKey }) => {
    const [poolDataExpanded, setPoolDataExpanded] = useState(false);

    const onPoolDataClick = useAccordionToggle(eventKey, () =>
      setPoolDataExpanded(!poolDataExpanded));

    return (
      <Button variant="link" onClick={onPoolDataClick}>
        Pool Data
        {' '}<FontAwesomeIcon icon={['fa', poolDataExpanded ? 'long-arrow-alt-up' : 'long-arrow-alt-down']} />
      </Button>
    )
  }

  const PoolData = ({ pid }) => (
    <ListGroup.Item>
      <Accordion>
        <center>
          <PoolDataToggle eventKey={pid.toString()} />
        </center>
        <Accordion.Collapse eventKey={pid.toString()}>
          <div>
            Pool Value
            <Badge variant="success" pill>
              {poolValue === -1
                ? 'Loading...' :
                '$' + getBalanceNumber(poolValue, 0)}
            </Badge>
            <br/>
            Supply
            <span>
              {totalSupply === -1
                ? 'Loading...' :
                getBalanceNumber(totalSupply, 0) + ' LP'}
            </span>
            <br/>
            Your Share
            <span>
              {totalSupply === -1
                ? 'Loading...' :
                stakedBalance.div(new BigNumber(10).pow(18)).div(totalSupply).times(100).toNumber().toFixed(6) + '%'}
            </span>
          </div>
        </Accordion.Collapse>
      </Accordion>
    </ListGroup.Item>
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
          <PoolData pid={pool.pid} />
          <ListGroup.Item style={{ textAlign: 'center' }}>
            ROI (week/month/year)
            <br />
            {roi ? (
              <b>
                {roi.apw === -1 ||
                roi.apw.toNumber() === Number.POSITIVE_INFINITY
                  ? '...'
                  : `${roi.apw
                      .times(new BigNumber(100))
                      .toNumber()
                      .toFixed(2)}%`}
                {' / '}
                {roi.apm === -1 ||
                roi.apm.toNumber() === Number.POSITIVE_INFINITY
                  ? '...'
                  : `${roi.apm
                      .times(new BigNumber(100))
                      .toNumber()
                      .toFixed(2)}%`}
                {' / '}
                {roi.apy === -1 ||
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
