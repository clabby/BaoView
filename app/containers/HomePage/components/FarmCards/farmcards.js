import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js';
import _ from 'underscore';

import '../../styles/homepage.scss';
import '../../styles/poolicons.scss';

import {
  Tabs,
  Tab,
  Form,
  Badge,
  Spinner,
  ListGroup,
  Button,
  InputGroup,
} from 'react-bootstrap';

import useAllStakedValue from '../../../../hooks/useAllStakedValue';
import useAllStakedBalance from '../../../../hooks/useAllStakedBalance';
import usePriceData from '../../../../hooks/usePriceData';
import useBao from '../../../../hooks/useBao';
import { getFarms } from '../../../../lib/bao/utils';

import FarmCard from '../FarmCard/Loadable';
import FarmListItem from '../FarmListItem/Loadable';

export default function FarmCards() {
  const stakedValue = useAllStakedValue();
  const stakedBalances = useAllStakedBalance();
  const bao = useBao();
  const farms = getFarms(bao);
  const priceData = usePriceData(farms);

  const baoIndex = farms.findIndex(({ tokenSymbol }) => tokenSymbol === 'BAO');
  const baoPrice =
    baoIndex >= 0 && stakedValue[baoIndex]
      ? stakedValue[baoIndex].tokenPriceInWeth
      : new BigNumber(0);

  const stakedPools = [];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('currently-staked');
  const [listType, setListType] = useState('cards');

  farms.forEach((farm, i) => {
    if (stakedValue[i] && stakedBalances[i] > 0) stakedPools.push(farm.pid);
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
        if (
          (type === 'BAOLP' && !pool.poolType) ||
          (type === 'SUSHILP' && pool.poolType && pool.poolType === 'sushi') ||
          (type === 'STAKED' && stakedPools.includes(pool.pid))
        )
          if (listType === 'cards') {
            poolElements.push(
              <FarmCard
                key={pool.pid}
                pool={pool}
                stakedValue={
                  stakedValue[farms.findIndex(({ pid }) => pid === pool.pid)]
                }
                priceData={priceData}
                baoPrice={baoPrice}
              />,
            );
          } else {
            poolElements.push(
              <FarmListItem
                key={pool.pid}
                farm={pool}
                stakedValue={
                  stakedValue[farms.findIndex(({ pid }) => pid === pool.pid)]
                }
                priceData={priceData}
                baoPrice={baoPrice}
              />,
            );
          }
      });

      if (poolElements.length === 0) poolElements[0] = 'empty';
    }

    return poolElements.length === 0 ? (
      <div className="col-12">
        <Spinner animation="grow" variant="info" />
      </div>
    ) : poolElements[0] === 'empty' ? (
      <div className="col-12">
        <h1 style={{ textAlign: 'center' }}>No Pools Found</h1>
      </div>
    ) : listType === 'cards' ? (
      poolElements
    ) : (
      <div className="col-12">
        <ListGroup>{poolElements}</ListGroup>
      </div>
    );
  }

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Search Pools</Form.Label>
          <InputGroup>
            <Form.Control
              type="email"
              placeholder="Enter Pool Name"
              onChange={handleSearchInputChange}
            />
            <InputGroup.Append>
              <Button
                variant="outline-success"
                onClick={() =>
                  setListType(listType === 'cards' ? 'list' : 'cards')
                }
              >
                Display Type:{' '}
                <Badge variant={listType === 'cards' ? 'warning' : 'info'}>
                  {listType === 'cards' ? 'Cards' : 'Simple List'}
                </Badge>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
      <center>
        <Tabs
          defaultActiveKey="currently-staked"
          activeKey={activeTab}
          id="pool-tabs"
          onSelect={key => setActiveTab(key)}
        >
          <Tab
            eventKey="bao-lp"
            title={
              <>
                All Bao LP{' '}
                {farms.length >= 0 && (
                  <Badge variant="warning">
                    {_.where(farms, { poolType: undefined }).length}
                  </Badge>
                )}
              </>
            }
          >
            {activeTab === 'bao-lp' && (
              <div className="row">{renderLPPools('BAOLP', searchQuery)}</div>
            )}
          </Tab>
          <Tab
            eventKey="sushi-lp"
            title={
              <>
                All Sushi LP{' '}
                {farms.length >= 0 && (
                  <Badge style={{ backgroundColor: '#ee57a3' }}>
                    {_.where(farms, { poolType: 'sushi' }).length}
                  </Badge>
                )}
              </>
            }
          >
            {activeTab === 'sushi-lp' && (
              <div className="row">{renderLPPools('SUSHILP', searchQuery)}</div>
            )}
          </Tab>
          <Tab
            eventKey="currently-staked"
            title={
              <>
                🧑‍🌾 Currently Staked{' '}
                {stakedValue.length > 0 && (
                  <Badge variant="info">{stakedPools.length}</Badge>
                )}
              </>
            }
          >
            {activeTab === 'currently-staked' && (
              <div className="row">{renderLPPools('STAKED', searchQuery)}</div>
            )}
          </Tab>
        </Tabs>
      </center>
    </div>
  );
}

/* FarmCards.propTypes = {
  account: PropTypes.object,
} */

/* FarmCards.defaultProps = {
  account: null,
} */
