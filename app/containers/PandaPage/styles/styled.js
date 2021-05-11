import styled from 'styled-components';
import { lighten } from 'polished';

import { FormControl, Table, Tabs } from 'react-bootstrap';
import { Colors } from '../../App/styles/colors';

export const DarkInput = styled(FormControl)`
  background-color: ${lighten(0.1, Colors.background)};
  border: 3px solid ${lighten(0.15, Colors.background)};

  &:active,
  &:focus {
    background-color: ${lighten(0.1, Colors.background)};
    border: 3px solid ${lighten(0.2, Colors.background)};
    box-shadow: none;
  }
`;

export const DarkTable = styled(Table)`
  border: 2px solid ${lighten(0.2, Colors.background)};
  background-color: ${lighten(0.1, Colors.background)};

  thead > tr {
    text-align: center;
  }

  td {
    text-align: center;
  }
`;

export const DarkTabs = styled(Tabs)`
  border-bottom: none;
  margin-bottom: 20px;

  .nav-item {
    color: ${Colors.textColor};
    border-radius: 5px;
    background-color: ${Colors.background};

    &:hover {
      border-color: ${lighten(0.1, Colors.background)};
      background-color: ${lighten(0.1, Colors.background)};
    }

    &.active {
      color: ${Colors.textColor};
      border-color: ${lighten(0.2, Colors.background)};
      background-color: ${lighten(0.2, Colors.background)};
    }
  }
`;
