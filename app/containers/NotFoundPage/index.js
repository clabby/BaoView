/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react'

import {
  NotFoundContainer,
  NotFoundContent
} from './styles/styled'

export default function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <h1>404</h1>
        <hr />
        Page not found.
      </NotFoundContent>
    </NotFoundContainer>
  );
}
