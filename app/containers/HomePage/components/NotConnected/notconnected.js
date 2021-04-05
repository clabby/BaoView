import React from 'react';
import { isMobile } from 'react-device-detect';

import {
  NotConnectedContainer,
  NotConnectedContent
} from './styles/styled'

export default function NotConnected() {
  return (
    <NotConnectedContainer>
      <NotConnectedContent>
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
      </NotConnectedContent>
    </NotConnectedContainer>
  );
}
