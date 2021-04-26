import React from 'react';
import BigNumber from 'bignumber.js';

import {
  Badge,
  Button,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useFarmTotalValue from '../../../../hooks/useFarmTotalValue';
import useROI from '../../../../hooks/useROI';
import useStakedTVL from '../../../../hooks/useStakedTVL';
import useEarnings from '../../../../hooks/useEarnings';
import useStakedBalance from '../../../../hooks/useStakedBalance';
import { getBalanceNumber, decimate } from '../../../../lib/formatBalance';

import {
  LeftBadge,
  StarBadge,
  PaddedListItem,
  PoolIcon,
  LPImage,
} from './styles/styled';

import SushiIcon from '../../../../images/sushiswap.png';
import BaoIcon from '../../../../images/baologo.png';

export default function FarmListItem({
  farm,
  baoPrice,
  priceData,
  stakedValue,
}) {
  const { totalSupply } = stakedValue;
  const farmTvl = useFarmTotalValue(farm, priceData);
  const tvl = useStakedTVL(farm.pid);
  const pendingBao = useEarnings(farm.pid);
  const stakedBalance = useStakedBalance(farm.pid);
  const roi = useROI(
    farm.pid,
    baoPrice,
    tvl === -1 || farmTvl === -1
      ? -1
      : new BigNumber(farmTvl.total).times(
          tvl.div(decimate(new BigNumber(totalSupply))),
        ),
    tvl === -1 || farmTvl === -1,
  );

  const Loading = () => <Spinner animation="border" size="sm" variant="info" />;

  return (
    <PaddedListItem>
      {stakedBalance && stakedBalance > 0 && (
        <OverlayTrigger
          overlay={<Tooltip>Currently Staked</Tooltip>}
          placement="top"
        >
          <StarBadge
            variant="success"
            className="mr-2"
            style={{ fontSize: '1rem !important' }}
          >
            <FontAwesomeIcon icon={['fas', 'star']} />
          </StarBadge>
        </OverlayTrigger>
      )}
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>{`${
            farm.poolType && farm.poolType === 'sushi' ? 'Sushi' : 'Bao'
          } LP`}</Tooltip>
        }
      >
        {farm.poolType && farm.poolType === 'sushi' ? (
          <LeftBadge className="mr-2" style={{ backgroundColor: '#ee57a3' }}>
            <LPImage src={SushiIcon} alt="Sushi LP" />
          </LeftBadge>
        ) : (
          <LeftBadge variant="warning" className="mr-2">
            <LPImage src={BaoIcon} alt="Bao LP" />
          </LeftBadge>
        )}
      </OverlayTrigger>
      <LeftBadge variant="secondary" className="mr-2">
        <PoolIcon
          className={`${farm.icon.split('/')[1].split('.')[0]} pool-icon`}
        />
      </LeftBadge>
      <b>{farm.name}</b>
      {stakedBalance && stakedBalance > 0 && (
        <>
          {' - '}
          {pendingBao === -1 ? (
            <Loading />
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Pending Bao</Tooltip>}
            >
              <LeftBadge pill variant="success">
                {`${getBalanceNumber(pendingBao)} Bao.cx`}
              </LeftBadge>
            </OverlayTrigger>
          )}
          {' - '}
          {farmTvl === -1 ? (
            <Loading />
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>LP Value (USD)</Tooltip>}
            >
              <LeftBadge pill variant="success">
                {`$${getBalanceNumber(
                  stakedBalance.div(totalSupply).times(farmTvl.total),
                  0,
                )}`}
              </LeftBadge>
            </OverlayTrigger>
          )}
        </>
      )}
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            Click to go to the <Badge variant="danger">{farm.lpToken}</Badge>{' '}
            Pool Metrics page.
          </Tooltip>
        }
      >
        <Button
          variant="outline-info"
          size="sm"
          href={`/pool-metrics/${farm.pid}`}
          style={{ float: 'right' }}
        >
          {tvl === -1 || farmTvl === -1
            ? <Loading />
            : `$${getBalanceNumber(
              new BigNumber(farmTvl.total).times(
                tvl.div(decimate(new BigNumber(totalSupply))),
              ),
              0,
            )} Locked`}
          {' - '}
          {roi.apy ? `${getBalanceNumber(roi.apy, 0)}% APY` : <Loading />}{' '}
          <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
        </Button>
      </OverlayTrigger>
    </PaddedListItem>
  );
}
