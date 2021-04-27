import styled from 'styled-components';
import { lighten } from 'polished';

import { FormControl } from 'react-bootstrap';
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
