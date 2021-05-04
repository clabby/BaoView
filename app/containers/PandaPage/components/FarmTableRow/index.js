import React from 'react';
import { BigNumber } from 'bignumber.js';

import { Badge, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { usePandaStats } from '../../../../hooks/panda/usePandaStats';

import { getBalanceNumber } from '../../../../lib/formatBalance';

// Images
import PandaLogo from '../../../../images/pandalogo.png';
import PancakeLogo from '../../../../images/pancakelogo.png';

export default function FarmTableRow({
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

  const Loading = () => <Spinner animation="grow" size="sm" />;

  return (
    <tr>
      <td>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{poolType ? 'Cake' : 'Panda'} LP</Tooltip>}
        >
          {poolType ? (
            <Badge variant="warning">
              <img src={PancakeLogo} style={{ height: '1rem' }} />
            </Badge>
          ) : (
            <Badge variant="success">
              <img src={PandaLogo} style={{ height: '1rem' }} />
            </Badge>
          )}
        </OverlayTrigger>
      </td>
      <td>
        {(pool.pid === 5 || pool.pid === 6) && (
          <>
            <OverlayTrigger overlay={<Tooltip>Broken</Tooltip>}>
              <Badge pill variant="warning">
                <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
              </Badge>
            </OverlayTrigger>{' '}
          </>
        )}
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              View {pool.symbol.split(' ')[0]} LP Token on BSC Scan
            </Tooltip>
          }
        >
          <a
            href={`https://bscscan.com/token/${pool.lpAddresses[56]}`}
            target="_blank"
          >
            {pool.symbol.split(' ')[0]}{' '}
            <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
          </a>
        </OverlayTrigger>
      </td>
      <td>
        <Badge variant="info" pill>
          {pandaStats ? (
            `$${getBalanceNumber(new BigNumber(pandaStats.lockedUsd), 0)}`
          ) : (
            <Loading />
          )}
        </Badge>
      </td>
      <td>
        <Badge variant="secondary" pill>
          {pandaStats ? (
            `${getBalanceNumber(pandaStats.roi.apy, 0)}%`
          ) : (
            <Loading />
          )}
        </Badge>
      </td>
      <td>
        <Badge variant="secondary" pill>
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
            )} PNDA per Day`
          ) : (
            <Loading />
          )}
        </Badge>
      </td>
    </tr>
  );
}
