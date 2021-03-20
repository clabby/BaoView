import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

import TokenPrice from './components/TokenPrice/Loadable';

import '../../styles/homepage.scss';

// import { useWallet } from 'use-wallet';

import useAllEarnings from '../../../../hooks/useAllEarnings';
import useLockedEarnings from '../../../../hooks/useLockedEarnings';

import { getDisplayBalance } from '../../../../lib/formatBalance';

export default function Overview() {
  const earnings = useAllEarnings();
  const lockedEarnings = useLockedEarnings();

  const [baoPrice, setBaoPrice] = useState(-1);
  const [ethPrice, setEthPrice] = useState(-1);
  const [daiPrice, setDaiPrice] = useState(-1);
  const [baoPriceChange, setBaoPriceChange] = useState('secondary');
  const [ethPriceChange, setEthPriceChange] = useState('secondary');
  const [daiPriceChange, setDaiPriceChange] = useState('secondary');

  useEffect(() => {
    // https://api.nomics.com/v1/currencies/ticker?key=45298ab851ffac5e118fce2b805a2a3a&ids=BAO&convert=USD
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bao-finance,ethereum,dai&vs_currencies=usd&include_24hr_change=true',
      { 'Access-Control-Allow-Origin': '*' },
    )
      .then(response => response.json())
      .then(data => {
        setEthPrice(data.ethereum.usd);
        setDaiPrice(data.dai.usd);
        setBaoPrice(data['bao-finance'].usd);

        setEthPriceChange(data.ethereum.usd_24h_change);
        setDaiPriceChange(data.dai.usd_24h_change);
        setBaoPriceChange(data['bao-finance'].usd_24h_change);
      });
  }, []);

  let sumEarning = -1;
  for (const earning of earnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber();
  }

  return (
    <div id="overview" className="mb-4">
      <h1>
        <FontAwesomeIcon icon={['fas', 'file-invoice-dollar']} /> Overview
      </h1>
      <hr />
      <div id="overview-stats" className="row row-cols-3">
        <div className="col">
          Total Locked Bao{' '}
          <span>
            {`${getDisplayBalance(lockedEarnings)} BaoCx`}
            <br />
            {baoPrice >= 0 && (
              <Badge variant="success">
                $
                {getDisplayBalance(
                  new BigNumber(
                    baoPrice * lockedEarnings.div(new BigNumber(10).pow(18)),
                  ),
                  0,
                )}
                {` | ${getDisplayBalance(
                  new BigNumber(baoPrice)
                    .times(lockedEarnings.div(new BigNumber(10).pow(18)))
                    .div(new BigNumber(daiPrice)),
                  0,
                )} DAI`}
              </Badge>
            )}
          </span>
        </div>
        <div className="col">
          Total Value of LP Staked <span>TODO</span>
        </div>
        <div className="col">
          Pending Harvest{' '}
          <span>
            {sumEarning === -1
              ? 'Loading...'
              : `${getDisplayBalance(new BigNumber(sumEarning), 0)} BaoCx`}
            <br />
            {baoPrice >= 0 && sumEarning >= 0 && (
              <Badge variant="success">
                ${getDisplayBalance(new BigNumber(baoPrice * sumEarning), 0)} |{' '}
                {`${getDisplayBalance(
                  new BigNumber(baoPrice * sumEarning).div(daiPrice),
                  0,
                )} DAI`}
              </Badge>
            )}
          </span>
        </div>
        <div className="col">
          BAO Price
          <br />
          <TokenPrice price={baoPrice} priceChange={baoPriceChange} rocket />
        </div>
        <div className="col">
          ETH Price
          <br />
          <TokenPrice price={ethPrice} priceChange={ethPriceChange} />
        </div>
        <div className="col">
          Dai Price
          <br />
          <TokenPrice price={daiPrice} priceChange={daiPriceChange} />
        </div>
      </div>
    </div>
  );
}
