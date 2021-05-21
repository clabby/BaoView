import React, { useState } from 'react';
import { BigNumber } from 'bignumber.js';

import {
  Accordion,
  Badge,
  ListGroup,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DarkCard,
  DarkCardHeader,
  DarkListGroupItem,
  PoolDataToggleButton,
  RightSpan,
} from './styles/styled';

import { decimate, getBalanceNumber } from '../../../../lib/formatBalance';

// Images
import PandaLogo from '../../../../images/pandalogo.png';
import PancakeLogo from '../../../../images/pancakelogo.png';

export default function FarmCard({
  pool,
  pandaStats,
  pandaUserStats,
  pndaPrice,
  activeWallet,
}) {
  const poolType = pool.poolType && pool.poolType === 'CAKE';

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

  const PoolDataToggle = ({ children, eventKey }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = useAccordionToggle(eventKey, () =>
      setExpanded(!expanded),
    );

    return (
      <center>
        <PoolDataToggleButton
          type="button"
          onClick={toggleAccordion}
          variant="link"
        >
          {children}{' '}
          <FontAwesomeIcon
            icon={['fas', `long-arrow-alt-${expanded ? 'up' : 'down'}`]}
          />
        </PoolDataToggleButton>
      </center>
    );
  };

  return (
    <div className="col-4">
      <DarkCard className="mb-2">
        <DarkCardHeader>
          <div
            className={`${pool.icon.split('/')[1].split('.')[0]} pool-icon`}
          />
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
              <DarkListGroupItem>
                Current Withdraw Fee{' '}
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <Badge variant="danger">NOTICE</Badge>
                      <br />
                      This date is an estimation, and it grows more inaccurate{' '}
                      as time passes due to block times not being consistent.{' '}
                      For the best results, please keep track of when you stake{' '}
                      and unstake your liquidity.
                      <br />
                      <b>
                        Last Fee Reset (Either first deposit or last{' '}
                        withdrawal):
                      </b>
                      <br />
                      {pandaUserStats &&
                        pandaUserStats.lastInteraction.toString()}
                    </Tooltip>
                  }
                >
                  <FontAwesomeIcon icon={['fas', 'question-circle']} />
                </OverlayTrigger>
                {': '}
                <Badge pill variant="info" style={{ float: 'right' }}>
                  {pandaUserStats ? (
                    pandaUserStats.lpStaked > 0 ? (
                      `${(pandaUserStats.withdrawPenalty * 100).toFixed(2)}%`
                    ) : (
                      '0.00%'
                    )
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
          <DarkListGroupItem>
            <Accordion>
              <PoolDataToggle eventKey={pool.symbol}>More Info</PoolDataToggle>
              <Accordion.Collapse eventKey={pool.symbol}>
                {pandaStats ? (
                  <>
                    <center>
                      <b>Pool Info</b>
                    </center>
                    LP Contract
                    <RightSpan>
                      <a
                        href={`https://bscscan.com/address/${
                          pandaStats.lpContractAddress
                        }`}
                        target="_blank"
                      >
                        {`${pandaStats.token0Symbol}-${
                          pandaStats.token1Symbol
                        }`}{' '}
                        <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
                      </a>
                    </RightSpan>
                    <br />
                    Total LP Supply Value
                    <RightSpan>
                      {`$${getBalanceNumber(
                        new BigNumber(pandaStats.totalSupplyUSD),
                        0,
                      )}`}
                    </RightSpan>
                    <br />
                    LP in Supply
                    <RightSpan>
                      {getBalanceNumber(new BigNumber(pandaStats.totalSupply))}
                    </RightSpan>
                    <br />
                    LP Staked
                    <RightSpan>
                      {getBalanceNumber(new BigNumber(pandaStats.totalLocked))}
                    </RightSpan>
                    <br /> % Staked
                    <RightSpan>
                      {getBalanceNumber(
                        new BigNumber(pandaStats.lockedPercentage),
                        0,
                      )}
                      %
                    </RightSpan>
                    <br />
                    <br />
                    <center>
                      <b>Oracle Info</b>
                    </center>
                    LINK Oracle Contract
                    <RightSpan>
                      <a
                        href={`https://bscscan.com/address/${
                          pandaStats.oracleContractAddress
                        }`}
                        target="_blank"
                      >
                        {pandaStats.oracleToken}{' '}
                        <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
                      </a>
                    </RightSpan>
                    <br />
                    Oracle Token Price
                    <RightSpan>
                      $
                      {pandaStats.oracleTokenPrice &&
                        getBalanceNumber(pandaStats.oracleTokenPrice, 0)}
                    </RightSpan>
                    <br />
                    <br />
                    <center>
                      <b>Tokens in LP Supply</b>
                    </center>
                    {pandaStats.token0Symbol}
                    <RightSpan>
                      {pandaStats.token0Balance &&
                        getBalanceNumber(pandaStats.token0Balance, 0)}
                    </RightSpan>
                    <br />
                    {pandaStats.token1Symbol}
                    <RightSpan>
                      {pandaStats.token1Balance &&
                        getBalanceNumber(pandaStats.token1Balance, 0)}
                    </RightSpan>
                  </>
                ) : (
                  <Loading />
                )}
              </Accordion.Collapse>
            </Accordion>
          </DarkListGroupItem>
        </ListGroup>
      </DarkCard>
    </div>
  );
}
