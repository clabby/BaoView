import React, { createContext, useEffect, useState } from 'react';

import { useWallet } from 'use-wallet';

import Web3 from 'web3';
import { Bao } from '../lib/bao';

import { INFURA_URI } from '../../env';

export const Context = createContext({
  bao: undefined,
  mainnet: undefined,
});

const BaoProvider = ({ children }) => {
  const { ethereum } = useWallet();
  const [bao, setBao] = useState();
  const [mainnet, setMainnet] = useState();

  window.bao = bao;
  window.mainnet = mainnet;

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
      setMainnet(new Web3(new Web3.providers.HttpProvider(INFURA_URI)));
      window.baosauce = baoLib;
    }
  }, [ethereum]);

  return (
    <Context.Provider value={{ bao, mainnet }}>{children}</Context.Provider>
  );
};

export default BaoProvider;
