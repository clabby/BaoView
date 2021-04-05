import React from 'react';
import BigNumber from 'bignumber.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';

import { getDisplayBalance } from '../../../../../../lib/formatBalance';

export default function Overview(props) {
  const { price } = props;
  const { priceChange } = props;

  const Loading = () => {
    return (
      <Spinner animation="border" size="sm" />
    )
  }

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip>
          {priceChange === 'secondary'
            ? <Loading />
            : `${(parseFloat(priceChange) >= 0 ? 'Up ' : 'Down ') +
                +(parseFloat(priceChange)).toFixed(3)}% in the last 24h`
          }
        </Tooltip>
      }
    >
      <Badge
        variant={
          priceChange === 'secondary'
            ? priceChange
            : parseFloat(priceChange) >= 0
              ? 'success'
              : 'danger'
        }
      >
        {props.rocket ? (
          <i>
            <FontAwesomeIcon icon={['fas', 'rocket']} />{' '}
          </i>
        ) : (
          ''
        )}
        {price === -1
          ? <Loading />
          : `$${getDisplayBalance(new BigNumber(price), 0)}`}
      </Badge>
    </OverlayTrigger>
  );
}
