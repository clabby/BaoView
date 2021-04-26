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
  Badge,
  Accordion,
  Spinner,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { QuestionIcon } from '../Overview/styles/styled';

import SushiIcon from '../../../../images/sushiswap.png';
import BaoIcon from '../../../../images/baologo.png';

import useStakedBalance from '../../../../hooks/useStakedBalance';
import useEarnings from '../../../../hooks/useEarnings';
import useUserInfo from '../../../../hooks/useUserInfo';
import useFarmTotalValue from '../../../../hooks/useFarmTotalValue';
import { getBalanceNumber, decimate } from '../../../../lib/formatBalance';

import useROI from '../../../../hooks/useROI';

import useStakedTVL from '../../../../hooks/useStakedTVL';

const formatDate = date =>
  `${trailZero(date.getMonth() + 1)}/${trailZero(
    date.getDay(),
  )}/${date.getFullYear()} ${trailZero(date.getHours())}:${trailZero(
    date.getMinutes(),
  )}`;

const trailZero = str => `0${str}`.slice(-2);

export default function FarmCard(props) {
  const { pool, stakedValue, priceData, baoPrice } = props;
  const stakedBalance = useStakedBalance(pool.pid);
  const pendingBao = useEarnings(pool.pid);
  const userInfo = useUserInfo(pool.pid);

  const totalFarmValue = useFarmTotalValue(pool, priceData);
  const tvl = useStakedTVL(pool.pid);
  const isSushi = pool.poolType && pool.poolType === 'sushi';

  let poolValue = -1;
  let totalSupply = -1;
  let lpValueUSD = -1;

  if (stakedValue && stakedBalance && totalFarmValue.total >= 0) {
    totalSupply = decimate(new BigNumber(stakedValue.totalSupply));
    poolValue = new BigNumber(totalFarmValue.total);
    lpValueUSD = decimate(stakedBalance)
      .div(totalSupply)
      .times(poolValue);
  }

  const roi = useROI(
    pool.pid,
    baoPrice,
    tvl === -1 || poolValue === -1 ? -1 : poolValue.times(tvl.div(totalSupply)),
    !(stakedValue && stakedBalance && totalFarmValue.total >= 0),
  );

  const PoolDataToggle = ({ eventKey }) => {
    const [poolDataExpanded, setPoolDataExpanded] = useState(false);

    const onPoolDataClick = useAccordionToggle(eventKey, () =>
      setPoolDataExpanded(!poolDataExpanded),
    );

    return (
      <Button variant="link" onClick={onPoolDataClick}>
        Pool Data{' '}
        <FontAwesomeIcon
          icon={[
            'fa',
            poolDataExpanded ? 'long-arrow-alt-up' : 'long-arrow-alt-down',
          ]}
        />
      </Button>
    );
  };

  const FeeInfoToggle = ({ eventKey }) => {
    const [feeInfoExpanded, setFeeInfoExpanded] = useState(false);

    const onFeeInfoClick = useAccordionToggle(eventKey, () =>
      setFeeInfoExpanded(!feeInfoExpanded),
    );

    return (
      <Button variant="link" onClick={onFeeInfoClick}>
        Fee Info{' '}
        <FontAwesomeIcon
          icon={[
            'fa',
            feeInfoExpanded ? 'long-arrow-alt-up' : 'long-arrow-alt-down',
          ]}
        />
      </Button>
    );
  };

  const Loading = () => <Spinner animation="border" size="sm" />;

  const FeeInfo = ({ pid }) => (
    <ListGroup.Item>
      <Accordion>
        <center>
          <FeeInfoToggle eventKey={`fee-info-collapse-${pid.toString()}`} />
        </center>
        <Accordion.Collapse eventKey={`fee-info-collapse-${pid.toString()}`}>
          <div>
            <center>
              <b className="badge badge-warning">Notice</b>
              <br />
              These dates are estimations. Block time on xDai is not constant at
              5 seconds, whereas this tool considers it to be. To be 100% sure,
              make sure to keep track of when you stake and withdraw!
            </center>
            <br />
            Current Unstake Fee{' '}
            <QuestionIcon
              title={
                'Current Unstake fee based off of the amount of time since your ' +
                'first deposit or your last withdraw. For more information, see the ' +
                '"Fees, Penalties and Funds" section of the Bao Finance docs.'
              }
            />
            <span>{userInfo ? `${userInfo.fee * 100}%` : <Loading />}</span>
            <br />
            First Deposit{' '}
            <span>
              {userInfo ? (
                typeof userInfo.firstDepositDate === 'string' ? (
                  userInfo.firstDepositDate
                ) : (
                  formatDate(userInfo.firstDepositDate)
                )
              ) : (
                <Loading />
              )}
            </span>
            <br />
            Last Deposit{' '}
            <span>
              {userInfo ? (
                typeof userInfo.lastDepositDate === 'string' ? (
                  userInfo.lastDepositDate
                ) : (
                  formatDate(userInfo.lastDepositDate)
                )
              ) : (
                <Loading />
              )}
            </span>
            <br />
            Last Withdraw{' '}
            <span>
              {userInfo ? (
                typeof userInfo.lastWithdrawDate === 'string' ? (
                  userInfo.lastWithdrawDate
                ) : (
                  formatDate(userInfo.lastWithdrawDate)
                )
              ) : (
                <Loading />
              )}
            </span>
          </div>
        </Accordion.Collapse>
      </Accordion>
    </ListGroup.Item>
  );

  const PoolData = ({ pid }) => (
    <ListGroup.Item>
      <Accordion>
        <center>
          <PoolDataToggle eventKey={`pool-data-collapse-${pid.toString()}`} />
        </center>
        <Accordion.Collapse eventKey={`pool-data-collapse-${pid.toString()}`}>
          <div>
            {isSushi && (
              <>
                <center>
                  <b>Mainnet</b>
                </center>
                Supply Value
                <span>
                  {totalFarmValue === -1
                    ? 'Loading...'
                    : `$${getBalanceNumber(new BigNumber(totalFarmValue.mainnetTotal), 0)}` /* eslint-disable-line*/}
                </span>
                <br />
                LP Supply
                <span>
                  {totalFarmValue === -1
                    ? 'Loading...'
                    : `${getBalanceNumber(totalFarmValue.mainnetSupply, 0)} LP`}
                </span>
                <center>
                  <b>xDai</b>
                </center>
              </>
            )}
            Supply Value
            <span>
              {poolValue === -1
                ? 'Loading...'
                : `$${getBalanceNumber(poolValue, 0)}`}
            </span>
            <br />
            TVL (USD)
            <span>
              {tvl === -1 || poolValue === -1
                ? 'Loading...'
                : `$${getBalanceNumber(poolValue.times(tvl.div(totalSupply)),0)}` /* eslint-disable-line*/}
            </span>
            <br />
            LP Supply
            <span>
              {totalSupply === -1
                ? 'Loading...'
                : `${getBalanceNumber(totalSupply, 0)} LP`}
            </span>
            <br />
            TVL (LP)
            <span>
              {tvl === -1 ? 'Loading...' : `${getBalanceNumber(tvl, 0)} LP`}
            </span>
            <br />% LP Staked
            <span>
              {tvl === -1 || totalSupply === -1
                ? 'Loading...'
                : `${getBalanceNumber(tvl.div(totalSupply).times(100), 0)}%`}
            </span>
            <br />
            Your Share
            <span>
              {/* eslint-disable */}
              {tvl === -1
                ? 'Loading...'
                : `${decimate(stakedBalance)
                      .div(tvl)
                      .times(100)
                      .toNumber()
                      .toFixed(6)}%`
              }
              {/* eslint-enable */}
            </span>
            <br />
            <b style={{ textAlign: 'center', display: 'block' }}>
              Tokens in LP Supply
            </b>
            <>
              {totalFarmValue === -1 || tvl === -1 || totalSupply === -1 ? (
                'Loading...'
              ) : (
                <>
                  {totalFarmValue.tokens[0].symbol}
                  <span>
                    {getBalanceNumber(
                      new BigNumber(
                        totalFarmValue.tokens[0].balance,
                      ) /* .times(tvl.div(totalSupply)) */,
                      0,
                    )}
                  </span>
                  <br />
                  {totalFarmValue.tokens[1].symbol}
                  <span>
                    {getBalanceNumber(
                      new BigNumber(
                        totalFarmValue.tokens[1].balance,
                      ) /* .times(tvl.div(totalSupply)) */,
                      0,
                    )}
                  </span>
                </>
              )}
            </>
          </div>
        </Accordion.Collapse>
      </Accordion>
    </ListGroup.Item>
  );

  return (
    <div className="col-4">
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>{pool.name}</Tooltip>}
          >
            <div
              className={`${pool.icon.split('/')[1].split('.')[0]} pool-icon`}
            />
          </OverlayTrigger>
          <Card.Title>
            {pool.name}
            <br />
            <small className="mt-2 mb-2">
              {pool.poolType && pool.poolType === 'sushi' ? (
                <Badge style={{ backgroundColor: '#ee57a3' }}>
                  <img
                    src={SushiIcon}
                    style={{ height: '1em' }}
                    alt="SUSHI LP"
                  />{' '}
                  SUSHI LP
                </Badge>
              ) : (
                <Badge variant="warning">
                  <img src={BaoIcon} style={{ height: '1em' }} alt="BAO LP" />{' '}
                  BAO LP
                </Badge>
              )}
            </small>
            <small>{pool.lpToken.split(' ')[0]}</small>
            <Button
              variant="info"
              href={`/pool-metrics/${pool.pid}`}
              className="mt-2"
            >
              <FontAwesomeIcon icon={['fa', 'chart-line']} /> Pool Metrics
            </Button>
          </Card.Title>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            LP Staked
            <span>
              {stakedBalance.toNumber() === -1 ? (
                <Loading />
              ) : (
                getBalanceNumber(stakedBalance)
              )}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            LP Value
            <span>
              {lpValueUSD === -1 ? (
                <Loading />
              ) : (
                `$${getBalanceNumber(lpValueUSD, 0)}`
              )}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Pending BAO
            <span>
              {pendingBao === -1 ? <Loading /> : getBalanceNumber(pendingBao)}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Bao.cx / day{' '}
            <QuestionIcon
              title={`Estimated Bao.cx per day based off of your staked LP and current APY for ${
                pool.lpToken
              }`}
            />
            <span>
              {roi === -1 || lpValueUSD === -1 || baoPrice === -1 ? (
                <Loading />
              ) : (
                getBalanceNumber(
                  new BigNumber(lpValueUSD)
                    .div(new BigNumber(baoPrice))
                    .times(roi.apw.div(7).div(100)),
                  0,
                )
              )}
            </span>
          </ListGroup.Item>
          <PoolData pid={pool.pid} />
          <FeeInfo pid={pool.pid} />
          <ListGroup.Item style={{ textAlign: 'center' }}>
            ROI (week/month/year)
            <br />
            {roi !== -1 ? (
              <b>
                {roi.apy === -1 ? '...' : `${roi.apw.toNumber().toFixed(2)}%`}
                <span style={{ color: '#b5b5b5', float: 'none' }}> / </span>
                {roi.apm === -1 ? '...' : `${roi.apm.toNumber().toFixed(2)}%`}
                <span style={{ color: '#b5b5b5', float: 'none' }}> / </span>
                {roi.apw === -1 ? '...' : `${roi.apy.toNumber().toFixed(2)}%`}
              </b>
            ) : (
              <Loading />
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

FarmCard.propTypes = {
  pool: PropTypes.object,
};

FarmCard.defaultProps = {
  pool: null,
};
