import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../../messages';
import '../../styles/homepage.scss';

import BaoImg from '../../../../images/bao.png'

export default function NotConnected () {
  return (
    <div id="not-connected" className="mt-4">
      <div id="not-connected-content">
        <h1 className="sunglasses">🕶️</h1>
        <h1><FormattedMessage {...messages.walletNotConnected} /></h1>
        <hr/>
        <small>Connect your 🦊 MetaMask wallet to view personalized pool data and pool metrics.</small>
      </div>
    </div>
  );
}
