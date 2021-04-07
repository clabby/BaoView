/**
 *
 * header.js
 *
 * Header component
 *
 */

import React from 'react';
import { isMobile } from 'react-device-detect';

import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WalletButton from './components/WalletButton/Loadable'
import {
  HeaderBar,
  HeaderLogo,
  CommunityToolsHeader
} from './styles/styled'

import Logo from '../../../../images/logo.png'

//import './styles/header.scss'

export default function Header() {
  return (
    <HeaderBar>
      <Navbar.Brand href="/">
        <HeaderLogo src={Logo} alt="LOGO" className="logo" />
      </Navbar.Brand>
      {!isMobile && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
      {!isMobile && (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="Help" id="help-dd">
              <NavDropdown.Item href="https://docs.bao.finance/faq/bao-related-questions">
                <FontAwesomeIcon icon={['fa', 'question-circle']} /> Bao Related Questions
              </NavDropdown.Item>
              <NavDropdown.Item href="https://docs.bao.finance/faq/technical-questions">
                <FontAwesomeIcon icon={['fa', 'question-circle']} /> Technical Questions
              </NavDropdown.Item>
              <NavDropdown.Item href="https://docs.bao.finance/faq/defi-questions">
                <FontAwesomeIcon icon={['fa', 'question-circle']} /> DeFi Questions
              </NavDropdown.Item>
              <NavDropdown.Item href="https://docs.bao.finance/faq/videos-resources">
                <FontAwesomeIcon icon={['fa', 'video']} /> Videos
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Resources" id="resources-dd">
              <NavDropdown.Item href="https://farms.baoswap.com/">
                <FontAwesomeIcon icon={['fa', 'tractor']} /> Bao Farms
              </NavDropdown.Item>
              <NavDropdown.Item href="https://docs.bao.finance">
                <FontAwesomeIcon icon={['fa', 'file-alt']} /> Bao Finance Docs
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.xdaichain.com">
                <FontAwesomeIcon icon={['fa', 'link']} /> xDai Chain
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://twitter.com/thebaoman">
                <FontAwesomeIcon icon={['fab', 'twitter']} /> BaoMan
              </NavDropdown.Item>
              <NavDropdown.Item href="https://discord.gg/vuYHdgyryg">
                <FontAwesomeIcon icon={['fab', 'discord']} /> Bao Finance Discord
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <CommunityToolsHeader>Other great community<br/>built tools</CommunityToolsHeader>
              <NavDropdown.Item href="https://stakedvalue.com/">
                <FontAwesomeIcon icon={['fas', 'star']} /> Staked Value
              </NavDropdown.Item>
              <NavDropdown.Item href="http://bao.live/">
                <FontAwesomeIcon icon={['fas', 'star']} /> bao.live (BaoStats)
              </NavDropdown.Item>
              <NavDropdown.Item href="https://baoboard.com/">
                <FontAwesomeIcon icon={['fas', 'star']} /> Bao Board
              </NavDropdown.Item>
              <NavDropdown.Item href="https://xdai.farm/">
                <FontAwesomeIcon icon={['fas', 'star']} />{' '}
                xdai.farm ( BaoSwap <FontAwesomeIcon icon={['fas', 'code-branch']} /> )
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <WalletButton />
        </Navbar.Collapse>
      )}
    </HeaderBar>
  );
}
