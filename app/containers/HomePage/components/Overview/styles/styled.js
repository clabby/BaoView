import React from 'react';

import styled from 'styled-components';
import { lighten } from 'polished';

import { OverlayTrigger, Tooltip, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Colors } from '../../../../App/styles/colors';

export const OverviewContainer = styled.div.attrs(() => ({
  className: 'mt-4 mb-4',
}))`
  background-color: ${lighten(0.1, Colors.background)};
  border: 3px solid ${lighten(0.2, Colors.background)};
  padding: 20px;
  border-radius: 5px;

  hr {
    border-top-color: ${lighten(0.2, Colors.background)} !important;
  }
`;

export const OverviewStats = styled.div.attrs(() => ({
  className: 'row row-cols-3',
}))`
  .col {
    text-align: center;
    padding: 10px;
    font-size: 24px;

    .fa-question-circle {
      vertical-align: middle;
      color: #b5b5b5;

      &:hover {
        color: $text-color;
      }
    }

    span {
      display: block;
      font-size: 16px;
      color: #b5b5b5;

      &.badge {
        display: inline-block;
        color: $text-color;
      }
    }
  }
`;

export const OverviewCol = styled.div.attrs(() => ({
  className: 'col',
}))`
  text-align: center;
  padding: 10px;
  font-size: 24px;

  span {
    display: block;
    font-size: 16px;
    color: #b5b5b5;

    &.badge {
      display: inline-block;
      color: ${Colors.textColor};
    }
  }
`;

export const Question = styled(FontAwesomeIcon).attrs({
  icon: ['fas', 'question-circle'],
  className: 'mb-1',
})`
  vertical-align: middle;
  color: #b5b5b5;
  transition: 200ms;

  &:hover {
    color: ${Colors.textColor} !important;
  }
`;

export const QuestionIcon = props => {
  const { title } = props;
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>{title}</Tooltip>}>
      <Question />
    </OverlayTrigger>
  );
};

export const OverviewHeading = ({ mainnet, xdai }) => (
  <>
    <h1>
      <span role="img" aria-label="Money Emoji">
        💸
      </span>{' '}
      Overview
      <small style={{ float: 'right', fontSize: '40%' }}>
        <Badge variant={mainnet ? 'success' : 'danger'}>
          <FontAwesomeIcon icon={['fas', 'wifi']} /> Mainnet:{' '}
          <FontAwesomeIcon icon={['fas', mainnet ? 'link' : 'times-circle']} />
        </Badge>
        <Badge variant={xdai ? 'success' : 'danger'} className="ml-2">
          <FontAwesomeIcon icon={['fas', 'wifi']} /> xDai:{' '}
          <FontAwesomeIcon icon={['fas', xdai ? 'link' : 'times-circle']} />
        </Badge>
      </small>
    </h1>
    <hr />
  </>
);
