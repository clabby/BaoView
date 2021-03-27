import React, { createContext, useEffect, useState } from 'react';

import { useWallet } from 'use-wallet';

import { Bao } from '../lib/bao';

export const BaoContext = {
  bao: typeof Bao,
};

export const Context = createContext({
  bao: undefined,
});

const BaoProvider = ({ children }) => {
  const { ethereum } = useWallet();
  const [bao, setBao] = useState();

  window.bao = bao;

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId);
      const baoLib = new Bao(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.05,
        testing: false,
        defaultGas: '300000',
        defaultGasPrice: '20000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      });
      setBao(baoLib);
      window.baosauce = baoLib;
    }
  }, [ethereum]);

  return <Context.Provider value={{ bao }}>{children}</Context.Provider>;
};

export default BaoProvider;
