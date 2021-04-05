import React from 'react';
import useWallet from 'use-wallet';

import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Identicon from '../Identicon/Loadable';

import { WButton } from './styles/styled'

function shortenWallet(wallet) {
  return `${wallet.substring(0, 6)}.....${wallet.substring(
    wallet.length - 4,
    wallet.length,
  )}`;
}

export default function WalletButton() {
  const wallet = useWallet();

  if (wallet.status === 'error') {
    return (
      <WButton
        className="error"
        onClick={() => {
          wallet.connect();
        }}
      >
        {typeof web3 === 'undefined' ? (
          <span>
            No{' '}
            <span role="img" aria-label="Fox Emoji">
              🦊
            </span>{' '}
            MetaMask Wallet Detected
          </span>
        ) : (
          <span>
            <FontAwesomeIcon icon={['fas', 'wifi']} /> Wrong Network
          </span>
        )}
      </WButton>
    );
  }
  if (wallet.status === 'connected') {
    return (
      <ButtonGroup>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>{wallet.account}</Tooltip>}
        >
          <WButton>
            <span>
              <Identicon style={{ display: 'inline' }} />
              <span className="ml-2">
                {shortenWallet(wallet.account)}
              </span>
            </span>
          </WButton>
        </OverlayTrigger>
        <WButton
          className="wallet-button disc"
          onClick={() => {
            wallet.reset();
          }}
        >
          <FontAwesomeIcon icon={['fas', 'times-circle']} />
        </WButton>
      </ButtonGroup>
    );
  }
  return (
    <WButton onClick={() => wallet.connect()}>
      <FontAwesomeIcon icon={['fa', 'plug']} />
      {wallet.status === 'connecting' ? ' Connecting...' : ' Connect Wallet'}
    </WButton>
  );
}
