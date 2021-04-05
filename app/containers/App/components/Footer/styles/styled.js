import React from 'react'

import styled from 'styled-components'
import { darken } from 'polished'
import { Colors } from '../../../styles/colors'

import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const FooterContainer = styled(Container)`
  margin-top: 150px;
  margin-bottom: 25px;

  .nav {
    .nav-item {
      a {
        color: ${Colors.textColor};
        transition: 200ms;
        text-decoration: none;
      }

      .link {
        &.blue {
          color: ${Colors.brand};
        }

        &:hover {
          color: ${darken(0.1, Colors.brand)};
        }
      }
    }

    .nav-item.right {
      float: right;
      align-items: flex-end;
    }
  }
`

export const HeartIcon = styled(FontAwesomeIcon).attrs({
  icon: ['fa', 'heart']
})`
  color: #d25b55
`
