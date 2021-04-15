import React from 'react';

import { Alert } from 'react-bootstrap';

import FarmCards from '../FarmCards/Loadable';
import Overview from '../Overview/Loadable';

import { ConnectedContainer } from './styles/styled';
import '../../styles/homepage.scss';

export default function Connected() {
  return (
    <ConnectedContainer>
      <Overview />
      <Alert variant="warning">
        <b>Notice: </b>
        ROI and LP Value (USD) may take up to <b>30 seconds</b> to load{' '}
        depending on your connection.
      </Alert>
      <FarmCards />
    </ConnectedContainer>
  );
}
