import styled from 'styled-components';

import { Badge, ListGroupItem } from 'react-bootstrap';

export const PaddedListItem = styled(ListGroupItem)`
  padding: 20px;
`;

export const LeftBadge = styled(Badge)`
  font-size: 12px !important;
  float: none !important;
`;

export const StarBadge = styled(LeftBadge)`
  font-size: 1rem !important;
`;

export const PoolIcon = styled.span`
  display: inline-block !important;
  height: 1.125rem !important;
  width: 1.125rem !important;
  margin: 0 0 -2px 0 !important;
  float: none !important;
`;
