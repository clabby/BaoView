import { Navbar } from 'react-bootstrap';

import styled from 'styled-components';
import { lighten } from 'polished';
import { Colors } from '../../../styles/colors';

export const HeaderBar = styled(Navbar).attrs({
  bg: 'dark',
  expand: 'lg',
  id: 'header',
  className: 'mt-4',
})`
  background-color: ${Colors.background} !important;
  border: none;
  border-radius: 0;
  background: ${Colors.background};

  .nav-item,
  a.nav-link {
    color: ${Colors.textColor} !important;

    &:hover {
      transition: 200ms;
      color: ${Colors.brand} !important;
    }
  }

  .dropdown-menu {
    background-color: ${lighten(0.1, Colors.background)};

    .dropdown-item {
      color: ${Colors.textColor};

      &:hover {
        background-color: ${lighten(0.2, Colors.background)};
      }
    }

    .dropdown-divider {
      border-top: 1px solid ${lighten(0.2, Colors.background)};
    }
  }
`;

export const HeaderLogo = styled.img`
  height: 35px;
`;

export const CommunityToolsHeader = styled.span`
  text-align: center;
  display: block;
`;
