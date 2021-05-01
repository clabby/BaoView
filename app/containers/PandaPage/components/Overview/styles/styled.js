import styled from 'styled-components';
import { lighten } from 'polished';

import { Col } from 'react-bootstrap';
import { Colors } from '../../../../App/styles/colors';

export const OverviewContainer = styled.div.attrs(() => ({
  className: 'mb-4',
}))`
  background-color: ${lighten(0.1, Colors.background)};
  border: 3px solid ${lighten(0.2, Colors.background)};
  padding: 20px;
  border-radius: 5px;

  hr {
    border-top-color: ${lighten(0.2, Colors.background)} !important;
  }
`;

export const OverviewStat = styled(Col)`
  text-align: center;
`;
