import BigNumber from 'bignumber.js';

export const getBalanceNumber = (balance, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
  return displayBalance
    .toNumber()
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getDisplayBalance = (balance, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4);
  }
  return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getFullDisplayBalance = (balance, decimals = 18) =>
  balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed();
