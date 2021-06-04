import React from 'react';

import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FarmCards from '../FarmCards/Loadable';
import Overview from '../Overview/Loadable';

import { ConnectedContainer, DangerLink } from './styles/styled';
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
        Bao.cx distribution has hit its soft cap of 1T. Minting of new Bao.cx{' '}
        has ended, meaning farming rewards are no longer accumulating. Visit the{' '}
        Bao Finance{' '}
        <DangerLink href="https://gov.bao.finance/">forums</DangerLink>,{' '}
        <DangerLink href="https://snapshot.page/#/baovotes.eth">
          Snapshot
        </DangerLink>{' '}
        or the{' '}
        <DangerLink href="https://discord.gg/BW3P62vJXT">Discord</DangerLink>{' '}
        information.
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
