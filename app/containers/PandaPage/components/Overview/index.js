import React, { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';

import { Row, Badge, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverviewContainer, OverviewStat } from './styles/styled';

import erc20Abi from '../../../../lib/bao/lib/abi/erc20.json';
import { decimate, getBalanceNumber } from '../../../../lib/formatBalance';

export default function Overview({ web3, pndaPrice }) {
  const [totalSupply, setTotalSupply] = useState(undefined);

  useEffect(() => {
    const effectFunc = async () => {
      const pndaContract = new web3.eth.Contract(
        erc20Abi,
        '0x47DcC83a14aD53Ed1f13d3CaE8AA4115f07557C0',
      );

      const [tokenSupply, tokenDecimals] = await Promise.all([
        pndaContract.methods.totalSupply().call(),
      ]);

      setTotalSupply(decimate(new BigNumber(tokenSupply), tokenDecimals));
    };
    effectFunc();
  }, []);

  const Loading = () => <Spinner animation="grow" size="sm" />;

  return (
    <OverviewContainer>
      <Row>
        <OverviewStat>
          PNDA Total Supply
          <br />
          <Badge variant="success">
            {totalSupply ? (
              `${getBalanceNumber(totalSupply, 0)} PNDA`
            ) : (
              <Loading />
            )}
          </Badge>
        </OverviewStat>
        <OverviewStat>
          PNDA Market Cap
          <br />
          <Badge variant="success">
            {totalSupply && pndaPrice ? (
              `$${getBalanceNumber(
                new BigNumber(pndaPrice).times(totalSupply),
                0,
              )}`
            ) : (
              <Loading />
            )}
          </Badge>
        </OverviewStat>
        <OverviewStat>
          PNDA Price{' '}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Prices from BSC ChainLink Oracles</Tooltip>}
          >
            <FontAwesomeIcon icon={['fas', 'question-circle']} />
          </OverlayTrigger>
          <br />
          <Badge variant="success">
            {pndaPrice ? `$${pndaPrice.toFixed(6)}` : <Loading />}
          </Badge>
        </OverviewStat>
      </Row>
    </OverviewContainer>
  );
}
