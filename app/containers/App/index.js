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
import PoolMetrics from 'containers/PoolMetrics/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { Container } from 'react-bootstrap';

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/overrides.scss';

// Set up font awesome library and import icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTractor,
  faTimesCircle,
  faPlug,
  faChartLine,
  faHeart,
  faFileAlt,
  faLink,
  faFileInvoiceDollar,
  faRocket,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faQuestionCircle,
  faVideo,
  faWifi
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faTwitter,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';
import Footer from './components/Footer/Loadable';
import Header from './components/Header/Loadable';
library.add(
  faTractor,
  faTimesCircle,
  faPlug,
  faChartLine,
  faHeart,
  faGithub,
  faTwitter,
  faDiscord,
  faFileAlt,
  faLink,
  faFileInvoiceDollar,
  faRocket,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faQuestionCircle,
  faVideo,
  faWifi
);

export default function App() {
  return (
    <div>
      <Container style={{ marginBottom: '-50px' }}>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route path="/pool-metrics/:pid" component={PoolMetrics} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}
