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
          Non-xDai pairs seem to be bugged at the moment. Working on a fix!
        </div>
        <FarmCards /* account={account} */ />
      </div>
    </div>
  );
}
