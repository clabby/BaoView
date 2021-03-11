import React from 'react';
import PropTypes from 'prop-types';

import { Container, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/footer.scss';

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
        <a
          className="link"
          onClick={() => {
            navigator.clipboard.writeText(props.discord);
          }}
        >
          {`@${props.tag}`}
        </a>
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
    <Container className="footer">
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-gh" href="#">
            Built with{' '}
            <FontAwesomeIcon
              icon={['fa', 'heart']}
              style={{ color: '#d25b55' }}
            />
            {' by '}
            <CopyOnClick discord="somethingElse#1655" tag="somethingElse" />
            {' and '}
            <CopyOnClick discord="vex#9406" tag="vex" />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );

  /*
  Unused GitHub link
  <Nav.Item>
    <Nav.Link
      eventKey="link-gh-repo"
      href="#"
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
  */
}
