/**
 * Pool Metrics Page
 */

import React, { useState } from 'react';
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
} from 'react-bootstrap';

import { DarkInput, DarkTable } from './styles/styled';

import '../HomePage/styles/poolicons.scss';

import supportedPools from '../../lib/panda/supportedPools';
import FarmCard from './components/FarmCard';
import FarmTableRow from './components/FarmTableRow';
import Overview from './components/Overview';
import masterChefAbi from '../../lib/bao/lib/abi/masterchef.json';
import getPriceOracles from '../../lib/panda/oracles';

import { usePndaPrice } from '../../hooks/panda/usePandaStats';

export default function PandaPage() {
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

  const poolElements = [];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeWallet, setActiveWallet] = useState('');
  const [displayType, setDisplayType] = useState('cards');

  let pools = supportedPools;
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
          web3={web3}
          masterChefContract={masterChefContract}
          priceOracles={priceOracles}
          pndaPrice={pndaPrice}
          activeWallet={activeWallet}
        />,
      );
    else
      poolElements.push(
        <FarmTableRow
          pool={pool}
          key={pool.pid}
          web3={web3}
          masterChefContract={masterChefContract}
          priceOracles={priceOracles}
          pndaPrice={pndaPrice}
        />,
      );
  });

  return (
    <Container className="mt-4">
      <Alert variant="success" style={{ textAlign: 'center' }}>
        <Badge variant="success">INFO</Badge>
        <br />
        More data coming soon! One sided pools are currently not working.
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
                    setActiveWallet(event.target.value);
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
