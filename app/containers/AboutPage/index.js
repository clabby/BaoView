/**
 * About Page
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
        <h1>About Bao View</h1>
        <hr />
        I {' '}
        <FontAwesomeIcon
          icon={['fa', 'heart']}
          style={{ color: '#d25b55' }}
        /> Bao Finance!
        <span className="line-break" />
        This tool was created to help users keep track of the
        value they have staked in Bao Finance pools on xDai.
        <hr />
        <Badge variant="warning">Disclaimers</Badge>
        <span className="line-break" />
        Bao View is not affiliated with{' '}
        <a href="https://bao.finance/">Bao Finance</a>.
        <span className="line-break" />
        Data is provided as an educational resource, and it is not intended to be
        interpreted as financial advise.
        <span className="line-break" />
        BaoView and its creator are not liable for any financial decisions made
        based on the information provided by this tool.
        <hr />
        <Badge variant="success">Donate</Badge>
        <span className="line-break" />
        If you enjoy the project, consider buying me a beer! Donations
        are accepted on both Mainnet and xDai (:
        <span className="line-break" />
        vex: <br />
        <CopyOnClick address="0xe18d60bD57B5D626dAcf5C959534f28aE5e272C9" />
      </div>
    </Container>
  );
}
