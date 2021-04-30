/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import runtime from 'offline-plugin/runtime';

import HomePage from 'containers/HomePage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import PandaPage from 'containers/PandaPage/Loadable';
import PoolMetrics from 'containers/PoolMetrics/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { Container } from 'react-bootstrap';
import Footer from './components/Footer/Loadable';
import Header from './components/Header/Loadable';

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/fontawesome';
import './styles/overrides.scss';

runtime.install({
  onUpdating: () => {
    console.log('SW Event:', 'onUpdating');
  },
  onUpdateReady: async () => {
    console.log('SW Event:', 'onUpdateReady');
    // Tells to new SW to take control immediately
    await runtime.applyUpdate();
    window.location.reload();
  },
  onUpdated: () => {
    console.log('SW Event:', 'onUpdated');
    // Reload the webpage to load into the new version
    window.location.reload();
  },

  onUpdateFailed: () => {
    console.log('SW Event:', 'onUpdateFailed');
  },
});

export default function App() {
  return (
    <div>
      <Container style={{ marginBottom: '-50px' }}>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/panda" component={PandaPage} />
          <Route path="/pool-metrics/:pid" component={PoolMetrics} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}
