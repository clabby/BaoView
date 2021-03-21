import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'bignumber.js';

import useAllStakedValue from './useAllStakedValue';
import useAllStakedBalance from './useAllStakedBalance';

const useLPTotalUSDValue = () => {
  const [totalValue, setTotalValue] = useState(-1);

  const stakedValues = useAllStakedValue();
  const stakedBalances = useAllStakedBalance();

  const fetchLPValue = useCallback(async () => {
    let total = 0.0;

    if (stakedValues.length > 0 && stakedBalances.length > 0) {
      stakedValues.forEach((stakedValue, i) => {
        const totalSupply = new BigNumber(stakedValue.totalSupply).div(new BigNumber(10).pow(18))
        total += (stakedBalances[i].div(new BigNumber(10).pow(18)))
          .div(totalSupply)
          .times(new BigNumber(stakedValue.totalWethValue)).toNumber()
      });

      setTotalValue(total);
    }
  }, [stakedBalances, stakedValues]);

  useEffect(() => {
    fetchLPValue();
  }, [stakedValues, stakedBalances]);

  return totalValue;
};

export default useLPTotalUSDValue;
