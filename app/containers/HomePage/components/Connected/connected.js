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
        <FarmCards /* account={account} */ />
      </div>
    </div>
  );
}
