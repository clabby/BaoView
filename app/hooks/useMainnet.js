import { useContext } from 'react';
import { Context } from '../contexts/BaoProvider';

const useMainnetWeb3 = () => {
  const { mainnet } = useContext(Context);
  return mainnet;
};

export default useMainnetWeb3;
