import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/footer.scss';

export default function Footer () {
  return (
    <Container className="footer">
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="none">Built with <FontAwesomeIcon icon={['fa', 'heart']} style={{color: '#d25b55'}}/> by @clabby</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-gh">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Source Code</Tooltip>}
            >
              <FontAwesomeIcon icon={['fab', 'github']}/>
            </OverlayTrigger>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  )
}
