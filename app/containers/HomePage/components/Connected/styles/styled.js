import styled from 'styled-components';
import { lighten } from 'polished';

export const ConnectedContainer = styled.div.attrs(() => ({
  className: 'mt-4',
  id: 'connected',
}))`
  font-size: 18px;
`;

export const DangerLink = styled.a`
  color: #721c24;
  font-weight: bold;

  &:focus,
  &:hover {
    color: ${lighten(0.1, '#721c24')};
  }
`;
