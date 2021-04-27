import styled from 'styled-components';
import { lighten } from 'polished';

import { Card, ListGroupItem } from 'react-bootstrap';

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
