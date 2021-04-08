import React from 'react'
import styled from 'styled-components'

import { Container, Alert } from 'react-bootstrap'

export const PoolMetricsContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PoolMetricsContent = styled.div`
  display: block;
  width: 100%;
  padding: 50px;
  text-align: center;
`

export const AlertInfo = styled(Alert).attrs({
  variant: 'info'
})`
  hr {
    border-top-color: #abdde5 !important;
  }
`
