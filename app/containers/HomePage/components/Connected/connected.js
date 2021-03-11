import React from 'react';

import '../../styles/homepage.scss';

import { useWallet } from 'use-wallet';
import FarmCards from '../FarmCards/Loadable';

export default function Connected() {
  const account = useWallet();
  const bao = null;

  return (
    <div id="connected" className="mt-4">
      <div id="connected-content">
        <FarmCards account={account} bao={bao} />
      </div>
    </div>
  );
}
