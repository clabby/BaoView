import React from 'react';

import '../../styles/homepage.scss'

import FarmCards from '../FarmCards/Loadable'
import Overview from '../Overview/Loadable'
import { Alert } from 'react-bootstrap'
import {
  ConnectedContainer
} from './styles/styled'

export default function Connected() {
  return (
    <ConnectedContainer>
      <Overview />
      <Alert variant="warning">
        <b>Notice: </b>
        ROI and LP Value (USD) may take up to <b>30 seconds</b> to load depending
        on your connection.
      </Alert>
      <FarmCards />
    </ConnectedContainer>
  );
}
