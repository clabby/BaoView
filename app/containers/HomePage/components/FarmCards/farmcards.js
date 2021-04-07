import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import '../../styles/homepage.scss';
import '../../styles/poolicons.scss';

import { Tabs, Tab, Form, Badge, Spinner } from 'react-bootstrap';

import useAllStakedValue from '../../../../hooks/useAllStakedValue';
import useAllStakedBalance from '../../../../hooks/useAllStakedBalance';
import usePriceData from '../../../../hooks/usePriceData';
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
  const priceData = usePriceData(farms);

  const baoIndex = farms.findIndex(({ tokenSymbol }) => tokenSymbol === 'BAO');
  const baoPrice =
    baoIndex >= 0 && stakedValue[baoIndex]
      ? stakedValue[baoIndex].tokenPriceInWeth
      : new BigNumber(0);

  const stakedPools = [];

  farms.forEach((farm, i) => {
    if (stakedValue[i] && stakedBalances[i] > 0) {
      stakedPools.push(farm.pid);
    }
  });

  function renderLPPools(type, query) {
    const poolElements = [];

    if (stakedValue.length > 0) {
      let filteredPools = [];
      if (query === undefined || query === '') {
        filteredPools = farms;
      } else {
        filteredPools = farms.filter(
          pool =>
            pool.name.toLowerCase().includes(query.toLowerCase()) ||
            pool.lpToken.toLowerCase().includes(query.toLowerCase()),
        );
      }

      filteredPools.forEach(pool => {
        if ((type === 'BAOLP' && !pool.poolType)
            || (type === 'STAKED' && stakedPools.includes(pool.pid)))
          poolElements.push(
            <FarmCard
              key={pool.pid}
              pool={pool}
              stakedValue={stakedValue[farms.findIndex(({ pid }) => pid === pool.pid)]}
              priceData={priceData}
              baoPrice={baoPrice}
            />,
          );
      });

      if (poolElements.length === 0) poolElements[0] = 'empty';
    }

    return type === 'SUSHILP' ? (
      <div className="col-12">
        <h1 style={{ textAlign: 'center' }}>Sushi LP Support coming soon (:</h1>
      </div>
    ) : poolElements.length === 0 ? (
      <div className="col-12">
        <Spinner animation="grow" variant="info"/>
      </div>
    ) : poolElements[0] === 'empty' ? (
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
          <Tab eventKey="currently-staked"
            title={(
              <>
                Currently Staked <Badge variant="info">{stakedPools.length}</Badge>
              </>
            )}
          >
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
