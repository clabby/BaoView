import React from 'react'

import styled from 'styled-components'

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
    margin-bottom: 25px;
  }
`
