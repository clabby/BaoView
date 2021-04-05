import React from 'react'

import styled from 'styled-components'
import { lighten } from 'polished'
import { Colors } from '../../../../App/styles/colors'

import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const OverviewContainer = styled.div.attrs(props => ({
  className: 'mt-4 mb-4',
  id: 'connected'
}))`
  background-color: ${lighten(0.1, Colors.background)};
  border: 3px solid ${lighten(0.2, Colors.background)};
  padding: 20px;
  border-radius: 5px;

  hr {
    border-top-color: ${lighten(0.2, Colors.background)} !important;
  }
`

export const OverviewStats = styled.div.attrs(props => ({
  className: 'row row-cols-3'
}))`
  .col {
    text-align: center;
    padding: 10px;
    font-size: 24px;

    .fa-question-circle {
      vertical-align: middle;
      color: #b5b5b5;

      &:hover {
        color: $text-color;
      }
    }

    span {
      display: block;
      font-size: 16px;
      color: #b5b5b5;

      &.badge {
        display: inline-block;
        color: $text-color;
      }
    }
  }
`

export const OverviewCol = styled.div.attrs(props => ({
  className: 'col'
}))`
  text-align: center;
  padding: 10px;
  font-size: 24px;

  span {
    display: block;
    font-size: 16px;
    color: #b5b5b5;

    &.badge {
      display: inline-block;
      color: ${Colors.textColor};
    }
  }
`

export const Question = styled(FontAwesomeIcon).attrs({
  icon: ['fas', 'question-circle'],
  className: 'mb-1'
})`
  vertical-align: middle;
  color: #b5b5b5;
  transition: 200ms;

  &:hover {
    color: ${Colors.textColor} !important;
  }
`

export const QuestionIcon = (props) => {
  const title = props.title;
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>{title}</Tooltip>}>
      <Question />
    </OverlayTrigger>
  )
}

export const OverviewHeading = () => {
  return (
    <>
      <h1>
        <FontAwesomeIcon icon={['fas', 'file-invoice-dollar']} /> Overview
      </h1>
      <hr/>
    </>
  )
}
