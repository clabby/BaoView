import React from 'react';
import { BigNumber } from 'bignumber.js';

import {
  Badge,
  ListGroup,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DarkCard, DarkCardHeader, DarkListGroupItem } from './styles/styled';

import {
  usePandaStats,
  usePandaUserStats,
} from '../../../../hooks/panda/usePandaStats';

import { decimate, getBalanceNumber } from '../../../../lib/formatBalance';

// Images
import PandaLogo from '../../../../images/pandalogo.png';
import PancakeLogo from '../../../../images/pancakelogo.png';

export default function FarmCard({
  pool,
  web3,
  masterChefContract,
  priceOracles,
  pndaPrice,
  activeWallet,
}) {
  const poolType = pool.poolType && pool.poolType === 'CAKE';
  const pandaStats = usePandaStats(
    pool.pid,
    web3,
    masterChefContract,
    priceOracles,
    pndaPrice,
  );

  const pandaUserStats = usePandaUserStats(
    pool.pid,
    web3,
    masterChefContract,
    null,
    activeWallet,
  );

  const PndaPerDay = props =>
    `${getBalanceNumber(
      new BigNumber(
        ((pandaUserStats && pandaUserStats.lpStaked > 0 && pandaStats
          ? new BigNumber(pandaStats.lockedUsd).times(
            new BigNumber(pandaUserStats.lpStaked).div(
              decimate(new BigNumber(pandaStats.totalLocked)),
            ),
          ).toNumber()
          : 1000) /
          pndaPrice) *
        pandaStats.roi.wpy
          .div(7)
          .div(100)
          .toNumber(),
      ).times(props.ratio),
      0,
    )} ${props.ratio === 0.95 ? 'Locked' : 'Unlocked'}`;

  const Loading = () => <Spinner animation="grow" size="sm" />;

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
                <Loading />
              )}
            </Badge>
          </DarkListGroupItem>
          {activeWallet.length > 0 && (
            <>
              <DarkListGroupItem>
                LP Staked:{' '}
                <Badge pill variant="info" style={{ float: 'right' }}>
                  {pandaUserStats ? (
                    `${getBalanceNumber(pandaUserStats.lpStaked, 0)} LP`
                  ) : (
                    <Loading />
                  )}
                </Badge>
              </DarkListGroupItem>
              <DarkListGroupItem>
                LP Staked (USD):{' '}
                <Badge pill variant="info" style={{ float: 'right' }}>
                  {pandaUserStats && pandaStats ? (
                    `$${getBalanceNumber(
                      new BigNumber(pandaStats.lockedUsd).times(
                        new BigNumber(pandaUserStats.lpStaked).div(
                          decimate(new BigNumber(pandaStats.totalLocked)),
                        ),
                      ),
                      0,
                    )}`
                  ) : (
                    <Loading />
                  )}
                </Badge>
              </DarkListGroupItem>
              <DarkListGroupItem>
                Pending PNDA{' '}
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      Harvest with one click on https://pnda.farm/
                    </Tooltip>
                  }
                >
                  <a href="https://pnda.farm/#/farm" target="_blank">
                    <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
                  </a>
                </OverlayTrigger>
                {': '}
                <Badge pill variant="info" style={{ float: 'right' }}>
                  {pandaUserStats ? (
                    `${getBalanceNumber(
                      new BigNumber(pandaUserStats.pendingReward),
                      0,
                    )} PNDA`
                  ) : (
                    <Loading />
                  )}
                </Badge>
              </DarkListGroupItem>
            </>
          )}
          <DarkListGroupItem style={{ textAlign: 'center' }}>
            {pandaUserStats && pandaUserStats.lpStaked > 0 && pandaStats ? (
              <>
                PNDA per day{' '}
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      PNDA per day based off of the value of your staked LP.
                    </Tooltip>
                  }
                  placement="top"
                >
                  <FontAwesomeIcon icon={['fas', 'question-circle']} />
                </OverlayTrigger>
              </>
            ) : (
              'PNDA per day, per $1000 staked'
            )}
            <br />
            <Badge pill variant="success">
              {pandaStats ? (
                <>
                  <PndaPerDay ratio={0.95} />
                  {' - '}
                  <PndaPerDay ratio={0.05} />
                </>
              ) : (
                <Loading />
              )}
            </Badge>
          </DarkListGroupItem>
          <DarkListGroupItem style={{ textAlign: 'center' }}>
            ROI (year / month / week)
            <br />
            {pandaStats ? (
              <>
                <Badge pill variant="secondary">
                  {getBalanceNumber(pandaStats.roi.apy, 0)}%
                </Badge>
                {' / '}
                <Badge pill variant="secondary">
                  {getBalanceNumber(pandaStats.roi.mpy, 0)}%
                </Badge>
                {' / '}
                <Badge pill variant="secondary">
                  {getBalanceNumber(pandaStats.roi.wpy, 0)}%
                </Badge>
              </>
            ) : (
              <Badge pill variant="secondary">
                <Loading />
              </Badge>
            )}
          </DarkListGroupItem>
        </ListGroup>
      </DarkCard>
    </div>
  );
}
