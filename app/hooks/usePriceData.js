import { useCallback, useEffect, useState } from 'react';
import _ from 'underscore';

import cgList from '../lib/cg-list.json';

const specialCasePairs = {
  ftt: 'ftx token',
  yusd: 'yydai+yusdc+yusdt+ytusd',
};

// ftt and yusd have odd token symbols
const specialCaseCheck = tokens => {
  /* eslint-disable */
  if (tokens[0].toLowerCase() === 'ftt') tokens[0] = specialCasePairs.ftt;
  if (tokens[1].toLowerCase() === 'ftt') tokens[1] = specialCasePairs.ftt;

  if (tokens[0].toLowerCase() === 'yusd') tokens[0] = specialCasePairs.yusd;
  if (tokens[1].toLowerCase() === 'yusd') tokens[1] = specialCasePairs.yusd;
  /* eslint-enable */
};

const usePriceData = farms => {
  const [priceData, setPriceData] = useState(-1);

  const fetchPriceData = useCallback(async () => {
    const tokenIds = [];

    farms.forEach(farm => {
      const tokens = farm.id.split(' ')[0].split('-');
      specialCaseCheck(tokens);
      const a = _.findWhere(cgList, { symbol: tokens[0].toLowerCase() });
      const b = _.findWhere(cgList, { symbol: tokens[1].toLowerCase() });

      if (a && b) {
        if (!_.contains(tokenIds, a.id)) tokenIds.push(a.id);
        if (!_.contains(tokenIds, b.id)) tokenIds.push(b.id);
      }
    });

    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=` +
        `${tokenIds.join(',')}&vs_currencies=usd&include_24hr_change=true`,
    )
      .then(response => response.json())
      .then(fetchedPriceData => {
        setPriceData(fetchedPriceData);
      });
  }, []);

  useEffect(() => {
    fetchPriceData();
  }, []);

  return priceData;
};

export default usePriceData;
