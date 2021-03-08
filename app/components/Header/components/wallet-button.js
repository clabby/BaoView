import React from 'react';
import useWallet from 'use-wallet';

import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Identicon from '../../Identicon/identicon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/header.scss';

function shortenWallet (wallet) {
  return wallet.substring(0, 4) + '.....' + wallet.substring(wallet.length - 4, wallet.length);
}

export default function WalletButton () {
  const wallet = useWallet();

  return wallet.status === 'connected' ? (
    <ButtonGroup>
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>{wallet.account}</Tooltip>}
      >
        <Button className="wallet-button">
          <span>
            <Identicon style={{display: 'inline'}} />
            <span className="ml-2" id="wallet-shorthand">{shortenWallet(wallet.account)}</span>
          </span>
        </Button>
      </OverlayTrigger>
      <Button className="wallet-button disc" onClick={() => { wallet.reset() }}><FontAwesomeIcon icon={['fas', 'times-circle']}/></Button>
    </ButtonGroup>
  ) : (
    <Button className="wallet-button" onClick={() => { wallet.connect() }}>
      <FontAwesomeIcon icon={['fa', 'plug']} /> Connect Wallet
    </Button>
  );
}
