/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Container, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/about.scss';

export default function AboutPage() {
  function CopyOnClick(props) {
    return (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Click to Copy!</Tooltip>}
      >
        <Badge
          variant="secondary"
          onClick={() => {
            navigator.clipboard.writeText(props.address);
          }}
          role="button"
        >
          {props.address}
        </Badge>
      </OverlayTrigger>
    );
  }

  CopyOnClick.propTypes = {
    address: PropTypes.string,
  };
  CopyOnClick.defaultProps = {
    address: null,
  };

  return (
    <Container id="about">
      <div id="about-content">
        <h1>About Staked Value</h1>
        <hr />
        We{' '}
        <FontAwesomeIcon
          icon={['fa', 'heart']}
          style={{ color: '#d25b55' }}
        />{' '}
        Bao Finance! This tool is provided to help you keep track of the
        liquidity pools you are currently staked in.
        <hr />
        <Badge variant="warning">Disclaimers</Badge>
        <span className="line-break" />
        Staked Value is not affliated with{' '}
        <a href="https://bao.finance/">Bao Finance</a>.
        <span className="line-break" />
        Data is provided as an educational resource and not intended to be taken
        as financial advise.
        <hr />
        <Badge variant="success">Donate</Badge>
        <span className="line-break" />
        If you enjoy the project, consider donating to the creators! Donations
        are accepted on both Mainnet and xDai (:
        <span className="line-break" />
        somethingElse: <br />
        <CopyOnClick address="0x37172fA0316a06c6d5e2Bb00785e0f356D27CFF8" />
        <span className="line-break" />
        vex: <br />
        <CopyOnClick address="0xe18d60bD57B5D626dAcf5C959534f28aE5e272C9" />
      </div>
    </Container>
  );
}
