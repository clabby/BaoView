import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../../messages';
import '../../styles/homepage.scss';

import { Tabs, Tab } from 'react-bootstrap';
import FarmCard from '../FarmCard/Loadable';

import { supportedPools } from '../../../../lib/constants.js'

export default function Connected () {
  function renderBaoLPPools () {
    var poolElements = [];

    supportedPools.forEach((pool, i) => {
      if (!pool.poolType) poolElements.push(<FarmCard key={pool.pid} pool={pool} />);
    });
    return poolElements;
  }

  function renderSushiLPPools () {
    var poolElements = [];

    supportedPools.forEach((pool, i) => {
      if (pool.poolType) poolElements.push(<FarmCard key={pool.pid} pool={pool} />);
    });
    return poolElements;
  }

  return (
    <div id="connected" className="mt-4">
      <div id="connected-content">
        <Tabs defaultActiveKey="bao-lp" id="pool-tabs">
          <Tab eventKey="bao-lp" title="Bao LP">
            <div className="row">
              {renderBaoLPPools()}
            </div>
          </Tab>
          <Tab eventKey="sushi-lp" title="Sushi LP">
            <div className="row">
              {renderSushiLPPools()}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
