/**
 * Panda Stats Page
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import _ from 'lodash';
import ethereumRegex from 'ethereum-regex';

import {
  Alert,
  Badge,
  Button,
  Container,
  Form,
  InputGroup,
  Tab,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DarkInput, DarkTable, DarkTabs } from './styles/styled';
import './styles/poolicons.scss';

import supportedPools from '../../lib/panda/supportedPools';
import FarmCard from './components/FarmCard';
import FarmTableRow from './components/FarmTableRow';
import Overview from './components/Overview';
import masterChefAbi from '../../lib/bao/lib/abi/masterchef.json';
import getPriceOracles from '../../lib/panda/oracles';

import {
  useAllPandaStats,
  useAllPandaUserStats,
  usePndaPrice,
} from '../../hooks/panda/usePandaStats';

export default function PandaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWallet, setActiveWallet] = useState('');
  const [displayType, setDisplayType] = useState('cards');
  const [activeTab, setActiveTab] = useState('PANDA');

  /*
   * Set up Web3
   */
  const provider = 'https://bsc-dataseed4.binance.org/'; // BSC JSON RPC
  const web3Provider = new Web3.providers.HttpProvider(provider);
  const web3 = new Web3(web3Provider);

  const MASTER_CHEF_ADDRESS = '0x9942cb4c6180820E6211183ab29831641F58577A';
  const masterChefContract = new web3.eth.Contract(
    masterChefAbi,
    MASTER_CHEF_ADDRESS, // Panda Farming Contract Address
  );
  const priceOracles = getPriceOracles(web3);
  const pndaPrice = usePndaPrice(web3, masterChefContract, priceOracles);

  const pandaStats = useAllPandaStats(
    web3,
    masterChefContract,
    priceOracles,
    pndaPrice,
  );
  const pandaUserStats = useAllPandaUserStats(
    web3,
    masterChefContract,
    priceOracles,
    activeWallet,
  );

  const setWallet = wallet => {
    if (wallet && ethereumRegex({ exact: true }).test(wallet))
      setActiveWallet(wallet);
  };

  const { wallet } = useParams();
  useEffect(() => setWallet(wallet), [wallet]);

  const poolElements = [];
  let pools = supportedPools;

  // Filter by tab
  pools = _.filter(
    pools,
    pool =>
      (activeTab === 'STAKED' &&
        activeWallet &&
        pandaUserStats &&
        _.find(pandaUserStats, { pid: pool.pid }).lpStaked.toNumber() > 0) ||
      (activeTab === 'PANDA' && !pool.poolType) ||
      (activeTab === 'CAKE' && pool.poolType),
  );

  // Filter by search query (if query is present)
  if (searchQuery.length > 0) {
    pools = _.filter(
      pools,
      pool =>
        pool.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pool.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  _.each(pools, pool => {
    if (displayType === 'cards')
      poolElements.push(
        <FarmCard
          pool={pool}
          key={pool.pid}
          pandaStats={_.find(pandaStats, { pid: pool.pid })}
          pandaUserStats={_.find(pandaUserStats, { pid: pool.pid })}
          pndaPrice={pndaPrice}
          activeWallet={activeWallet}
        />,
      );
    else
      poolElements.push(
        <FarmTableRow
          pool={pool}
          key={pool.pid}
          pandaStats={_.find(pandaStats, { pid: pool.pid })}
          pandaUserStats={_.find(pandaUserStats, { pid: pool.pid })}
          pndaPrice={pndaPrice}
        />,
      );
  });

  return (
    <Container className="mt-4">
      <Alert variant="warning" style={{ textAlign: 'center' }}>
        <Badge variant="warning">
          <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
        </Badge>
        <br />
        This page is a work in progress. More features are on the way!
      </Alert>
      <Overview
        web3={web3}
        supportedPools={supportedPools}
        pndaPrice={pndaPrice}
      />
      <h1>
        <span role="img" aria-label="Panda">
          🐼
        </span>{' '}
        Panda Pools
      </h1>
      <hr />
      <Form>
        <Form.Group controlId="formBasicEmail">
          {displayType === 'cards' && (
            <>
              <Form.Label>
                Active Wallet:{' '}
                <Badge variant="info" pill style={{ verticalAlign: 'center' }}>
                  {activeWallet.length > 0 ? activeWallet : 'None'}
                </Badge>
              </Form.Label>
              <DarkInput
                type="text"
                placeholder="Enter Wallet Address for personalized data (Connect button coming soon!)"
                onChange={event => {
                  if (ethereumRegex({ exact: true }).test(event.target.value))
                    window.location.href = `https://baoview.xyz/panda/${
                      event.target.value
                    }`;
                }}
              />
              <hr />
            </>
          )}
          <Form.Label>Search Pools</Form.Label>
          <InputGroup>
            <DarkInput
              type="email"
              placeholder="Enter Pool Name"
              onChange={event => {
                setSearchQuery(event.target.value);
              }}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setDisplayType(displayType === 'cards' ? 'list' : 'cards');
                }}
              >
                Display Mode:{' '}
                {displayType === 'cards' ? (
                  <Badge variant="warning">Cards</Badge>
                ) : (
                  <Badge variant="info">Simple List</Badge>
                )}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
      <DarkTabs
        defaultActiveKey="PANDA"
        activeKey={activeTab}
        id="pool-tabs"
        onSelect={key => setActiveTab(key)}
      >
        <Tab
          eventKey="PANDA"
          title={
            <>
              All Panda LP{' '}
              {supportedPools.length >= 0 && (
                <Badge variant="success">
                  {_.filter(supportedPools, pool => !pool.poolType).length}
                </Badge>
              )}
            </>
          }
        />
        <Tab
          eventKey="CAKE"
          tabClassName="ml-2"
          title={
            <>
              All Cake LP{' '}
              {supportedPools.length >= 0 && (
                <Badge variant="warning">
                  {_.filter(supportedPools, { poolType: 'CAKE' }).length}
                </Badge>
              )}
            </>
          }
        />
        <Tab
          eventKey="STAKED"
          tabClassName="ml-2"
          title={
            <>
              🧑‍🌾 Currently Staked{' '}
              {pools.length > 0 && (
                <Badge variant="info">
                  {
                    _.filter(
                      pandaUserStats,
                      pool => pool.lpStaked.toNumber() > 0,
                    ).length
                  }
                </Badge>
              )}
            </>
          }
        />
      </DarkTabs>
      {displayType === 'cards' ? (
        <div className="row">{poolElements}</div>
      ) : (
        <DarkTable striped variant="dark" responsive="sm">
          <thead>
            <tr>
              <th>LP Type</th>
              <th>LP Token</th>
              <th>TVL</th>
              <th>APY</th>
              <th>Reward Per $1000 Staked</th>
            </tr>
          </thead>
          <tbody>{poolElements}</tbody>
        </DarkTable>
      )}
    </Container>
  );
}
