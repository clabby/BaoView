/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import Connected from './components/Connected/Loadable.js';
import NotConnected from './components/NotConnected/Loadable.js';

import useWallet from 'use-wallet';

import Bootstrap from 'react-bootstrap';
import NET from 'vanta/dist/vanta.net.min'

import './styles/homepage.scss';

export default function HomePage() {
  const wallet = useWallet();

  return wallet.status === 'connected' ? (<Connected />) : (<NotConnected />);
}
