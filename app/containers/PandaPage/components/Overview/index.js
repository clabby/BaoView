import React, { useEffect, useState } from 'react';

import { BigNumber } from 'bignumber.js';

import { Row, Badge, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ParentSize } from '@visx/responsive';
import BarChart from './components/BarChart';
import { OverviewContainer, OverviewStat } from './styles/styled';

import erc20Abi from '../../../../lib/bao/lib/abi/erc20.json';
import { decimate, getBalanceNumber } from '../../../../lib/formatBalance';

export default function Overview({ web3, pndaPrice }) {
  const [totalSupply, setTotalSupply] = useState(undefined);
  const [sevenDayData, setSevenDayData] = useState(undefined);

  const sevenDayTvl = sevenDayData && sevenDayData.sevenDayTvl;
  const sevenDayRhinoBurn = sevenDayData && sevenDayData.sevenDayRhinoBurn;
  const sevenDayRhinoOneToOne =
    sevenDayData && sevenDayData.sevenDayRhinoOneToOne;

  useEffect(() => {
    const effectFunc = async () => {
      const pndaContract = new web3.eth.Contract(
        erc20Abi,
        '0x47DcC83a14aD53Ed1f13d3CaE8AA4115f07557C0',
      );

      const [tokenSupply, tokenDecimals] = await Promise.all([
        pndaContract.methods.totalSupply().call(),
        pndaContract.methods.decimals().call(),
      ]);

      setTotalSupply(decimate(new BigNumber(tokenSupply), tokenDecimals));

      fetch('https://api.baoview.xyz/api/v1/panda-metrics')
        .then(response => response.json())
        .then(res => setSevenDayData(res));
    };
    effectFunc();
  }, []);

  const Loading = () => <Spinner animation="grow" size="sm" />;

  return (
    <OverviewContainer>
      <Row className="row-cols-3">
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
      <hr />
      <center>
        <h5 style={{ marginBottom: 0 }}>
          <Badge variant="info">
            <FontAwesomeIcon icon={['fas', 'chart-line']} /> 7d Stats{' '}
          </Badge>{' '}
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip>
                <b>Why is there less than 7 days of data being displayed?</b>
                <br />
                This section is a work in progress, and data collection began on{' '}
                May 7, 2021. These charts will be populated with 7 days worth of{' '}
                data from May 14, 2021 onwards.
              </Tooltip>
            }
          >
            <FontAwesomeIcon icon={['fas', 'question-circle']} style={{ verticalAlign: 'middle' }} />
          </OverlayTrigger>
        </h5>
      </center>
      <br />
      <Row className="row-cols-3">
        <OverviewStat className="mt-2">
          <center>
            {sevenDayTvl ? (
              <ParentSize>
                {parent => (
                  <BarChart
                    data={sevenDayTvl}
                    title="Total Value Locked (USD)"
                    formatNumber={num => `$${num}`}
                    parent={parent}
                  />
                )}
              </ParentSize>
            ) : (
              <Spinner animation="grow" variant="info" />
            )}
          </center>
        </OverviewStat>
        <OverviewStat className="mt-2">
          <center>
            {sevenDayRhinoBurn ? (
              <ParentSize>
                {parent => (
                  <BarChart
                    data={sevenDayRhinoBurn}
                    title="Rhino Burned"
                    formatNumber={num => `${num} RHINO`}
                    parent={parent}
                  />
                )}
              </ParentSize>
            ) : (
              <Spinner animation="grow" variant="info" />
            )}
          </center>
        </OverviewStat>
        <OverviewStat className="mt-2">
          <center>
            {sevenDayRhinoOneToOne ? (
              <ParentSize>
                {parent => (
                  <BarChart
                    data={sevenDayRhinoOneToOne}
                    title="Rhino 1:1 Contract Balance"
                    formatNumber={num => `${num} RHINO`}
                    parent={parent}
                  />
                )}
              </ParentSize>
            ) : (
              <Spinner animation="grow" variant="info" />
            )}
          </center>
        </OverviewStat>
      </Row>
    </OverviewContainer>
  );
}
