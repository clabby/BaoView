import React from 'react';
import { isMobile } from 'react-device-detect';

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
        <h1>Welcome to Bao View!</h1>
        <hr />
        {isMobile ? (
          <small>
            Please connect on a desktop device to begin.
          </small>
        ) : (
          <small>
            Connect your{' '}
            <span role="img" aria-label="fox">
              🦊
            </span>{' '}
            MetaMask wallet to view personalized pool data and pool metrics.
          </small>
        )}
      </div>
    </div>
  );
}
