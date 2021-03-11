/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';

import { Container } from 'react-bootstrap';

import './styles/notfound.scss';

export default function NotFound() {
  return (
    <Container id="not-found">
      <div id="not-found-content">
        <h1>404</h1>
        <hr />
        Page not found.
      </div>
    </Container>
  );
}
