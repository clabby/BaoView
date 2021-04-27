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
