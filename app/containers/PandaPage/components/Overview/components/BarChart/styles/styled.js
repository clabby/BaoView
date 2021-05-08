import styled from 'styled-components';
import { lighten } from 'polished';
import { Colors } from '../../../../../../App/styles/colors';

export const ChartContainer = styled.div`
  border: 2px solid ${lighten(0.2, Colors.background)};
  border-radius: 5px;
  padding: 10px;
`;
