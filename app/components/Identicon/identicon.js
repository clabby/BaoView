import React, { useEffect, useRef } from 'react';
import useWallet from 'use-wallet';

import styled from 'styled-components';

import Jazzicon from 'jazzicon';

const StyledIdenticonContainer = styled.div`
  border-radius: 1.125rem;
  display: inline-block;
  vertical-align: middle;
`;

export default function Identicon() {
  const ref = useRef();
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(16, parseInt(wallet.account.slice(2, 10), 16)))
    }
  }, [wallet.account]);

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <StyledIdenticonContainer ref={ref} />
}
