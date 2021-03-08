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
import { UseWalletProvider } from 'use-wallet';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Header from 'components/Header/Loadable';
import Footer from 'components/Footer/Loadable';

import { Container } from 'react-bootstrap';

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/overrides.scss';

// Set up font awesome library and import icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTractor, faTimesCircle, faPlug, faChartLine, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'
library.add(faTractor, faTimesCircle, faPlug, faChartLine, faHeart, faGithub, faTwitter, faDiscord);

export default function App() {

  return (
    <UseWalletProvider chainId={100}>
      <Container style={{marginBottom: '-50px'}}>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
      <Footer />
    </UseWalletProvider>
  );
}
