import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../../messages';
import '../../styles/homepage.scss';

export default function NotConnected() {
  return (
    <div id="not-connected" className="mt-4">
      <div id="not-connected-content">
        <h1 className="sunglasses">
          <span role="img" aria-label="BaoBoi">
            😎🍱
          </span>
        </h1>
        <h1>
          <FormattedMessage {...messages.walletNotConnected} />
        </h1>
        <hr />
        <small>
          Connect your{' '}
          <span role="img" aria-label="fox">
            🦊
          </span>{' '}
          MetaMask wallet to view personalized pool data and pool metrics.
        </small>
      </div>
    </div>
  );
}
