import React from 'react'
import styled from 'styled-components'

import KaushanScript from '../../../../../fonts/HammersmithOne-Regular.ttf'

import BaoView from '../../../../../images/baoview.png'

export const NotConnectedContainer = styled.div.attrs(props => ({
  className: 'mt-4'
}))`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NotConnectedContent = styled.div.attrs(props => ({
  className: 'mt-4'
}))`
  text-align: center;

  .sunglasses {
    display: inline-block;
    font-size: 128px;
    margin-bottom: 15px;
  }
`

export const WelcomeTitle = styled.h1`
  @font-face {
    font-family: "Hammersmith";
    font-style: normal;
    font-weight: 400;
    src: url(${KaushanScript});
  }

  font-size: 48px;
  font-family: "Hammersmith"
`

export const BaoViewLogo = styled.img.attrs(props => ({
  src: BaoView
}))`
  height: 128px;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: middle;
`
