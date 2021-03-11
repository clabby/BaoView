import React, { useState } from 'react';
import PropTypes from 'prop-types';

import '../../styles/homepage.scss';
import '../../styles/poolicons.scss';

import { Tabs, Tab, Form } from 'react-bootstrap';
import { supportedPools } from '../../../../lib/constants';

import FarmCard from '../FarmCard/Loadable';

export default function FarmCards(props) {
  const { account } = props;
  const { bao } = props;

  const [searchQuery, setSearchQuery] = useState('');

  function renderLPPools(type, query) {
    const poolElements = [];

    if (query === undefined || query === '') {
      supportedPools.forEach(pool => {
        if (type === 'BAOLP' && !pool.poolType)
          poolElements.push(
            <FarmCard key={pool.pid} pool={pool} account={account} bao={bao} />,
          );
        if (type === 'SUSHILP' && pool.poolType)
          poolElements.push(
            <FarmCard key={pool.pid} pool={pool} account={account} bao={bao} />,
          );
      });
    } else {
      const filteredPools = supportedPools.filter(
        pool =>
          pool.name.toLowerCase().includes(query.toLowerCase()) ||
          pool.symbol.toLowerCase().includes(query.toLowerCase()),
      );

      filteredPools.forEach(pool => {
        if (type === 'BAOLP' && !pool.poolType)
          poolElements.push(
            <FarmCard key={pool.pid} pool={pool} account={account} bao={bao} />,
          );
        if (type === 'SUSHILP' && pool.poolType)
          poolElements.push(
            <FarmCard key={pool.pid} pool={pool} account={account} bao={bao} />,
          );
      });
    }

    return poolElements.length === 0 ? (
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
      <Tabs defaultActiveKey="bao-lp" id="pool-tabs">
        <Tab eventKey="bao-lp" title="Bao LP">
          <div className="row">{renderLPPools('BAOLP', searchQuery)}</div>
        </Tab>
        <Tab eventKey="sushi-lp" title="Sushi LP">
          <div className="row">{renderLPPools('SUSHILP', searchQuery)}</div>
        </Tab>
      </Tabs>
    </div>
  );
}

FarmCards.propTypes = {
  account: PropTypes.object,
  bao: PropTypes.object,
};

FarmCards.defaultProps = {
  account: null,
  bao: null,
};
