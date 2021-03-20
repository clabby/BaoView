import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import '../../styles/homepage.scss';
import '../../styles/poolicons.scss';

import { Tabs, Tab, Form } from 'react-bootstrap';

import useAllStakedValue from '../../../../hooks/useAllStakedValue';
import useAllStakedBalance from '../../../../hooks/useAllStakedBalance';
import useBao from '../../../../hooks/useBao';
import { getFarms } from '../../../../lib/bao/utils';

import FarmCard from '../FarmCard/Loadable';

export default function FarmCards(/* props */) {
  // const { account } = props;
  const stakedValue = useAllStakedValue();
  const stakedBalances = useAllStakedBalance();
  const [searchQuery, setSearchQuery] = useState('');
  const bao = useBao();
  const farms = getFarms(bao);

  const baoIndex = farms.findIndex(({ tokenSymbol }) => tokenSymbol === 'BAO');
  const baoPrice =
    baoIndex >= 0 && stakedValue[baoIndex]
      ? stakedValue[baoIndex].tokenPriceInWeth
      : new BigNumber(0);

  const BLOCKS_PER_WEEK = new BigNumber(44923);
  const BLOCKS_PER_MONTH = new BigNumber(194667);
  const BLOCKS_PER_YEAR = new BigNumber(2336000);
  const BAO_BER_BLOCK = new BigNumber(256000);

  const roi = [];
  const wEthValue = [];

  const stakedPools = [];

  farms.forEach((farm, i) => {
    // Total wEth value shows up as blank sometimes, causes some pools to show
    // no ROI
    roi[farm.pid] = {
      apw: stakedValue[i]
        ? baoPrice
            .times(BAO_BER_BLOCK)
          .times(BLOCKS_PER_WEEK)
          .times(stakedValue[i].poolWeight)
          .div(stakedValue[i].totalWethValue)
        : null,
      apm: stakedValue[i]
        ? baoPrice
          .times(BAO_BER_BLOCK)
            .times(BLOCKS_PER_MONTH)
          .times(stakedValue[i].poolWeight)
          .div(stakedValue[i].totalWethValue)
        : null,
      apy: stakedValue[i]
        ? baoPrice
          .times(BAO_BER_BLOCK)
          .times(BLOCKS_PER_YEAR)
            .times(stakedValue[i].poolWeight)
          .div(stakedValue[i].totalWethValue)
        : null,
    };

    if (stakedValue[i] && stakedBalances[i] > 0) {
      stakedPools.push(farm.pid);
    }
  });

  function renderLPPools(type, query) {
    const poolElements = [];

    if (query === undefined || query === '') {
      farms.forEach(pool => {
        if (type === 'BAOLP' && !pool.poolType)
          poolElements.push(
            <FarmCard
              key={pool.pid}
              pool={pool}
              stakedValue={stakedValue[farms.findIndex(({ pid }) => pid === pool.pid)]}
              roi={roi[pool.pid]} /* account={account} */
            />,
          );
        if (type === 'STAKED' && stakedPools.includes(pool.pid))
          poolElements.push(
            <FarmCard
              key={pool.pid}
              pool={pool}
              stakedValue={stakedValue[farms.findIndex(({ pid }) => pid === pool.pid)]}
              roi={roi[pool.pid]} /* account={account} */
            />,
          );
      });
    } else {
      const filteredPools = farms.filter(
        pool =>
          pool.name.toLowerCase().includes(query.toLowerCase()) ||
          pool.lpToken.toLowerCase().includes(query.toLowerCase()),
      );

      filteredPools.forEach(pool => {
        if (type === 'BAOLP' && !pool.poolType)
          poolElements.push(
            <FarmCard
              key={pool.pid}
              pool={pool}
              stakedValue={stakedValue[farms.findIndex(({ pid }) => pid === pool.pid)]}
              roi={roi[pool.pid]} /* account={account} */
            />,
          );
        if (type === 'STAKED' && stakedPools.includes(pool.pid))
          poolElements.push(
            <FarmCard
              key={pool.pid}
              pool={pool}
              stakedValue={stakedValue[farms.findIndex(({ pid }) => pid === pool.pid)]}
              roi={roi[pool.pid]} /* account={account} */
            />,
          );
      });
    }

    return type === 'SUSHILP' ? (
      <div className="col-12">
        <h1 style={{ textAlign: 'center' }}>Sushi LP Support coming soon (:</h1>
      </div>
    ) : poolElements.length === 0 ? (
      <div className="col-12">
        <h1 style={{ textAlign: 'center' }}>No Pools Found</h1>
      </div>
    ) : (
      poolElements
    );
  }

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Search Pools</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Pool Name"
            onChange={handleSearchInputChange}
          />
        </Form.Group>
      </Form>
      <center>
        <Tabs defaultActiveKey="bao-lp" id="pool-tabs">
          <Tab eventKey="bao-lp" title="All Bao LP">
            <div className="row">{renderLPPools('BAOLP', searchQuery)}</div>
          </Tab>
          <Tab eventKey="sushi-lp" title="All Sushi LP">
            <div className="row">{renderLPPools('SUSHILP', searchQuery)}</div>
          </Tab>
          <Tab eventKey="currently-staked" title="Currently Staked">
            <div className="row">{renderLPPools('STAKED', searchQuery)}</div>
          </Tab>
        </Tabs>
      </center>
    </div>
  );
}

/* FarmCards.propTypes = {
  account: PropTypes.object,
}; */

/* FarmCards.defaultProps = {
  account: null,
}; */
