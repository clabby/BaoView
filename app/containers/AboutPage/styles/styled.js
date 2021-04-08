import React from 'react'
import styled from 'styled-components'

import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Gif from '../../../images/baoview.gif'

export const HeartIcon = styled(FontAwesomeIcon).attrs({
  icon: ['fa', 'heart']
})`
  color: #d25b55
`

export const AboutContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`

export const AboutContent = styled.div`
  text-align: center;
  width: 60%;
`

export const LineBreak = styled.span`
  display: block;
  margin: 10px 0px;
`

export const BaoGif = styled.img.attrs(props => ({
  src: Gif
}))`
  height: 96px;
  margin-bottom: -60px;
`
