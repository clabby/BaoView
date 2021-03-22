import React from 'react';

import '../../styles/homepage.scss';

// import { useWallet } from 'use-wallet';
import FarmCards from '../FarmCards/Loadable';
import Overview from '../Overview/Loadable';

export default function Connected() {
  return (
    <div id="connected" className="mt-4">
      <div id="connected-content">
        <Overview />
        <div className="alert alert-warning">
          <strong>Notice: </strong>
          ROI and LP Value (USD) may take up to <b>30 seconds</b> to load depending
          on your connection.
        </div>
        <FarmCards /* account={account} */ />
      </div>
    </div>
  );
}
