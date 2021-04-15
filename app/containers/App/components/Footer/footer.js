import React from 'react';
import PropTypes from 'prop-types';

import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FooterContainer, HeartIcon } from './styles/styled';

export default function Footer() {
  function CopyOnClick(props) {
    const toolTip = (
      <Tooltip>
        <FontAwesomeIcon icon={['fab', 'discord']} />
        {` ${props.discord} - Click to copy!`}
      </Tooltip>
    );

    return (
      <OverlayTrigger placement="top" overlay={toolTip}>
        <span
          className="link blue"
          onClick={() => {
            navigator.clipboard.writeText(props.discord);
          }}
        >
          {`@${props.tag}`}
        </span>
      </OverlayTrigger>
    );
  }

  CopyOnClick.propTypes = {
    discord: PropTypes.string,
    tag: PropTypes.string,
  };
  CopyOnClick.defaultProps = {
    discord: null,
    tag: null,
  };

  return (
    <FooterContainer>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-gh" href="#">
            Built with <HeartIcon />
            {' by '}
            <CopyOnClick discord="vex#9406" tag="vex" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-gh-repo"
            href="https://github.com/clabby/BaoView"
            className="link"
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Source Code</Tooltip>}
            >
              <FontAwesomeIcon icon={['fab', 'github']} />
            </OverlayTrigger>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </FooterContainer>
  );
}
