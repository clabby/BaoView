import React from 'react';

import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FarmCards from '../FarmCards/Loadable';
import Overview from '../Overview/Loadable';

import { ConnectedContainer } from './styles/styled';
import '../../styles/homepage.scss';

export default function Connected() {
  return (
    <ConnectedContainer>
      <Overview />
      <Alert variant="danger" style={{ textAlign: 'center' }}>
        <b>
          <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} /> Notice
        </b>
        <br />
        Farming on xDai has concluded for the time being. LPs are no longer{' '}
        receiving BAO rewards.
        <br />
        See the active{' '}
        <a
          href="https://snapshot.org/#/baovotes.eth/proposal/QmRYVHrX5AgmuX64mWGb94GMZpZiWNeMm5vZQKyYx4QvqM"
          style={{ color: '#721c24', fontWeight: 'bold' }}
        >
          <FontAwesomeIcon icon={['fas', 'gavel']} /> Governance Vote
        </a>
        {', '}
        ending on June 2, 2021 at 11:59 P.M. EST, for more information.
      </Alert>
      <Alert variant="warning">
        <b>
          <FontAwesomeIcon icon={['fas', 'thumbtack']} /> Notice:
        </b>{' '}
        Some values may take up to <b>30 seconds</b> to load depending on your{' '}
        connection.
      </Alert>
      <FarmCards />
    </ConnectedContainer>
  );
}
