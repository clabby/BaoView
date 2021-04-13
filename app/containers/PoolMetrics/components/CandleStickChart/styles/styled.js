import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Colors } from '../../../../App/styles/colors'

import { Button } from 'react-bootstrap'

export const ChartContainer = styled.div`
  h1, p, div, span {
    color: #000 !important;
  }

  padding: 15px;
  border: 3px solid ${lighten(0.1, Colors.background)};
  border-radius: 5px;
`

export const InlineDiv = styled.div`
  display: inline-block;
`

export const CalendarButton = styled(Button)`
  border: 3px solid ${lighten(0.1, Colors.background)};
  color: ${Colors.textColor};

  &:active, &:focus {
    box-shadow: none
  }
`

export const LabelButton = styled(Button)`
  border: 3px solid ${lighten(0.1, Colors.background)};
  color: ${Colors.textColor};
  background-color: ${lighten(0.1, Colors.background)} !important;

  &:hover, &:active, &:focus {
    border-color: ${lighten(0.1, Colors.background)};
    background-color: ${lighten(0.1, Colors.background)} !important;
    box-shadow: none;
  }
`
