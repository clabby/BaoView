import React from 'react';
import BigNumber from 'bignumber.js';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useFarmTotalValue from '../../../../hooks/useFarmTotalValue';
import useROI from '../../../../hooks/useROI';
import useStakedTVL from '../../../../hooks/useStakedTVL';
import useEarnings from '../../../../hooks/useEarnings';
import useStakedBalance from '../../../../hooks/useStakedBalance';
import { getBalanceNumber } from '../../../../lib/formatBalance';

import {
  LeftBadge,
  StarBadge,
  PaddedListItem,
  PoolIcon,
} from './styles/styled';

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
          tvl.div(new BigNumber(totalSupply).div(new BigNumber(10).pow(18))),
        ),
    tvl === -1 || farmTvl === -1,
  );

  return (
    <PaddedListItem>
      {stakedBalance && stakedBalance > 0 && (
        <>
          <StarBadge
            variant="warning"
            className="mr-2"
            style={{ fontSize: '1rem !important' }}
          >
            <FontAwesomeIcon icon={['fas', 'star']} />
          </StarBadge>
        </>
      )}
      <LeftBadge variant="secondary" className="mr-2">
        <PoolIcon
          className={`${farm.icon.split('/')[1].split('.')[0]} pool-icon`}
        />
      </LeftBadge>
      <b>{farm.name}</b>
      {stakedBalance && stakedBalance > 0 && (
        <>
          {' - '}
          {pendingBao === -1
            ? 'Loading...'
            : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Pending Bao</Tooltip>}
                >
                  <LeftBadge pill variant="success">
                    {`${getBalanceNumber(pendingBao)} Bao.cx`}
                  </LeftBadge>
                </OverlayTrigger>
              )
          }
          {' - '}
          {stakedBalance === undefined || farmTvl === -1
            ? 'Loading...'
            : (
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
              )
          }
        </>
      )}
      <a href={`/pool-metrics/${farm.pid}`} style={{ float: 'right' }}>
        {tvl === -1 || farmTvl === -1
          ? 'Loading...'
          : `$${getBalanceNumber(
            new BigNumber(farmTvl.total).times(
              tvl.div(new BigNumber(totalSupply).div(new BigNumber(10).pow(18))),
            ), 0
          )} Locked`
        }
        {' - '}
        {roi.apy ? `${getBalanceNumber(roi.apy, 0)}% APY` : 'Loading...'}
      </a>
    </PaddedListItem>
  );
}
