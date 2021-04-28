import React from 'react';
import { BigNumber } from 'bignumber.js';

import { Badge, ListGroup, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DarkCard, DarkCardHeader, DarkListGroupItem } from './styles/styled';

import { usePandaStats } from '../../../../hooks/panda/usePandaStats';

import { getBalanceNumber } from '../../../../lib/formatBalance';

// Images
import PandaLogo from '../../../../images/pandalogo.png';
import PancakeLogo from '../../../../images/pancakelogo.png';

export default function FarmCard({
  pool,
  web3,
  masterChefContract,
  priceOracles,
  pndaPrice,
}) {
  const poolType = pool.poolType && pool.poolType === 'CAKE';
  const pandaStats = usePandaStats(
    pool.pid,
    web3,
    masterChefContract,
    priceOracles,
    pndaPrice,
  );

  return (
    <div className="col-4">
      <DarkCard className="mb-2">
        <DarkCardHeader>
          {(pool.pid === 5 || pool.pid === 6) && (
            <>
              <OverlayTrigger overlay={<Tooltip>Broken</Tooltip>}>
                <Badge pill variant="warning">
                  <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
                </Badge>
              </OverlayTrigger>{' '}
            </>
          )}
          {pool.name}
          <br />
          <small>{pool.symbol.split(' ')[0]}</small>
          <br />
          <Badge variant={poolType ? 'warning' : 'success'}>
            {poolType ? (
              <>
                <img src={PancakeLogo} style={{ height: '1rem' }} /> Cake LP
              </>
            ) : (
              <>
                <img src={PandaLogo} style={{ height: '1rem' }} /> Panda LP
              </>
            )}
          </Badge>
        </DarkCardHeader>
        <ListGroup variant="flush">
          <DarkListGroupItem>
            TVL:{' '}
            <Badge pill variant="info" style={{ float: 'right' }}>
              {pandaStats ? (
                `$${getBalanceNumber(new BigNumber(pandaStats.lockedUsd), 0)}`
              ) : (
                <Spinner animation="grow" size="sm" />
              )}
            </Badge>
          </DarkListGroupItem>
          <DarkListGroupItem style={{ textAlign: 'center' }}>
            PNDA per day, per $1000 staked
            <br />
            <Badge pill variant="success">
              {pandaStats ? (
                `${getBalanceNumber(
                  new BigNumber(
                    (1000 / pndaPrice) *
                      pandaStats.roi.wpy
                        .div(7)
                        .div(100)
                        .toNumber(),
                  ),
                  0,
                )} PNDA`
              ) : (
                <Spinner animation="grow" size="sm" />
              )}
            </Badge>
          </DarkListGroupItem>
          <DarkListGroupItem style={{ textAlign: 'center' }}>
            ROI (year / month / week)
            <br />
            <Badge pill variant="secondary">
              {pandaStats ? (
                `${getBalanceNumber(pandaStats.roi.apy, 0)}%`
              ) : (
                <Spinner animation="grow" size="sm" />
              )}
            </Badge>
            {' / '}
            <Badge pill variant="secondary">
              {pandaStats ? (
                `${getBalanceNumber(pandaStats.roi.mpy, 0)}%`
              ) : (
                <Spinner animation="grow" size="sm" />
              )}
            </Badge>
            {' / '}
            <Badge pill variant="secondary">
              {pandaStats ? (
                `${getBalanceNumber(pandaStats.roi.wpy, 0)}%`
              ) : (
                <Spinner animation="grow" size="sm" />
              )}
            </Badge>
          </DarkListGroupItem>
        </ListGroup>
      </DarkCard>
    </div>
  );
}
