import React from 'react'

import styled from 'styled-components'
import { lighten, darken } from 'polished'
import { Colors } from '../../../../../styles/colors'

import { Button } from 'react-bootstrap'

export const WButton = styled(Button)`
  background-color: transparent;
  border: 2px solid ${lighten(0.1, Colors.background)};

  &.error {
    border: 2px solid ${darken(0.05, Colors.error)};

    &:hover {
      background-color: transparent;
    }
  }

  &:hover, &:focus, &:active {
    background-color: ${lighten(0.1, Colors.background)} !important;
    border-color: ${lighten(0.1, Colors.background)} !important;
  }

  &.disc:hover {
    background-color: ${darken(0.05, Colors.error)} !important;
    border-color: ${darken(0.05, Colors.error)} !important;
  }
`
