/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';

import useWallet from 'use-wallet';
import Connected from './components/Connected/Loadable';
import NotConnected from './components/NotConnected/Loadable';

import './styles/homepage.scss';

export default function HomePage() {
  const wallet = useWallet();

  return wallet.status === 'connected' ? <Connected /> : <NotConnected />;
}
