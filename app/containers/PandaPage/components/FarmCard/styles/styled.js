import styled from 'styled-components';
import { lighten } from 'polished';

import { Button, Card, ListGroupItem } from 'react-bootstrap';

import { Colors } from '../../../../App/styles/colors';

export const DarkCard = styled(Card).attrs({
  className: 'mb-4',
})`
  background-color: ${lighten(0.2, Colors.background)};
`;

export const DarkCardHeader = styled(Card.Header)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
  text-align: center;
`;

export const DarkListGroupItem = styled(ListGroupItem)`
  background-color: ${lighten(0.1, Colors.background)};
`;

export const PoolDataToggleButton = styled(Button)`
  transition: 200ms;
  color: ${Colors.textColor};

  &:hover,
  &:focus {
    text-decoration: none;
    box-shadow: none;
    color: #17a2b8;
  }
`;

export const RightSpan = styled.span`
  float: right;
`;
