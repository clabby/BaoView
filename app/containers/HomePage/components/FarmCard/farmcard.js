import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../../messages';
import '../../styles/homepage.scss';
import '../../styles/poolicons.scss';

import { Card, Button, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FarmCard (props) {
  const pool = props.pool;

  const [lpStaked, setLpStaked] = useState(0);
  const [stakeValue, setStakeValue] = useState(0);
  const [roi, setRoi] = useState(0);
  const [baoPerDay, setBaoPerDay] = useState(0);

  return (
    <div className="col-4">
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <div variant="top" className={pool.iconClass + " pool-icon"}></div>
          <Card.Title>
            {pool.name}
            <br/>
            <small>{pool.symbol.split(' ')[0] + ' Pair'}</small>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Coming Soon!</Tooltip>}
            >
              <div>
                <Button variant="info" href="#" className="mt-2 disabled"><FontAwesomeIcon icon={['fa', 'chart-line']} /> Pool Metrics</Button>
              </div>
            </OverlayTrigger>
          </Card.Title>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Total LP Tokens Staked
            <span>{lpStaked}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Stake Value (DAI/USD)
            <span>{stakeValue}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            ROI (day/week/month)
            <span>{roi}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Bao.cx per Day
            <span>{baoPerDay}</span>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}
