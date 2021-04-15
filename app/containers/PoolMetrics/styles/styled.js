import styled from 'styled-components';

import { Container, Alert } from 'react-bootstrap';

import KaushanScript from '../../../fonts/KaushanScript-Regular.ttf';
import RobotoMono from '../../../fonts/RobotoMono-Light.ttf';

export const PoolMetricsContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PoolMetricsContent = styled.div`
  display: block;
  width: 100%;
  padding: 50px;
  text-align: center;
`;

export const AlertInfo = styled(Alert).attrs({
  variant: 'info',
})`
  hr {
    border-top-color: #abdde5 !important;
  }
`;

export const PoolTitle = styled.span`
  @font-face {
    font-family: 'Kaushan Script';
    font-style: normal;
    font-weight: 400;
    src: url(${KaushanScript});
  }
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: url(${RobotoMono});
  }

  font-family: 'Kaushan Script';

  small {
    font-family: 'Roboto Mono';
  }
`;

export const PoolSubtitle = styled.small`
  color: #b4b4b4;
  font-size: 60%;
`;
