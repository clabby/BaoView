/**
 *
 * header.js
 *
 * Header component
 *
 */

import React from 'react';

import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../../images/logo.png';

import WalletButton from './components/wallet-button';

import './styles/header.scss';

export default function Header() {
  return (
    <Navbar bg="dark" expand="lg" id="header" className="mt-4">
      <Navbar.Brand href="/">
        <img src={Logo} alt="LOGO" className="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="https://farms.baoswap.xyz/">
            <FontAwesomeIcon icon={['fa', 'tractor']} /> Bao Farms
          </Nav.Link>
          <NavDropdown title="Resources" id="basic-nav-dropdown">
            <NavDropdown.Item href="https://docs.bao.finance">
              Bao Finance Docs
            </NavDropdown.Item>
            <NavDropdown.Item href="https://www.xdaichain.com">
              xDai Chain
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="https://twitter.com/thebaoman">
              <FontAwesomeIcon icon={['fab', 'twitter']} /> BaoMan
            </NavDropdown.Item>
            <NavDropdown.Item href="#">
              <FontAwesomeIcon icon={['fab', 'discord']} /> Bao Finance Discord
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <WalletButton />
      </Navbar.Collapse>
    </Navbar>
  );
}
