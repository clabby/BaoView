/**
 * Pool Metrics Page
 */

import React, { useState } from 'react';
import Web3 from 'web3';
import _ from 'lodash';

import {
  Alert,
  Badge,
  Container,
  Form,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from 'react-bootstrap';

import { DarkInput } from './styles/styled';

import '../HomePage/styles/poolicons.scss';

import supportedPools from '../../lib/panda/supportedPools';
import FarmCard from './components/FarmCard';
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
    poolElements.push(
      <FarmCard
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
      <Alert variant="success" style={{textAlign: 'center'}}>
        <Badge variant="success">INFO</Badge>
        <br />
        More data coming soon! One sided pools are currently not working.
      </Alert>
      <h1>
        <span role="img" aria-label="Panda">
          🐼
        </span>{' '}
        Panda Pools{' '}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Prices from BSC ChainLink Oracles</Tooltip>}
        >
          <Badge
            variant="success"
            style={{ fontSize: '16px', verticalAlign: 'middle' }}
          >
            PNDA Price:{' '}
            {pndaPrice ? (
              `$${pndaPrice.toFixed(6)}`
            ) : (
              <Spinner animation="grow" size="sm" />
            )}
          </Badge>
        </OverlayTrigger>
      </h1>
      <hr />
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Search Pools</Form.Label>
          <DarkInput
            type="email"
            placeholder="Enter Pool Name"
            onChange={event => {
              setSearchQuery(event.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <div className="row">{poolElements}</div>
    </Container>
  );
}
