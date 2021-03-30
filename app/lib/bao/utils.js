import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { supportedPools } from './lib/constants';

import erc20Abi from './lib/abi/erc20.json';

import _ from 'underscore';

import { getBalanceNumber } from '../formatBalance';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
};

export const getMasterChefAddress = bao => bao && bao.masterChefAddress;

export const getWethPriceAddress = bao => bao && bao.wethPriceAddress;

export const getBaoPriceAddress = bao => bao && bao.baoPriceAddress;

export const getBaoAddress = bao => bao && bao.baoAddress;
export const getWethContract = bao =>
  bao && bao.contracts && bao.contracts.weth;

export const getWethPriceContract = bao =>
  bao && bao.contracts && bao.contracts.wethPrice;

export const getBaoPriceContract = bao =>
  bao && bao.contracts && bao.contracts.baoPrice;

export const getMasterChefContract = bao =>
  bao && bao.contracts && bao.contracts.masterChef;
export const getBaoContract = bao => bao && bao.contracts && bao.contracts.bao;

export const getFarms = bao =>
  bao
    ? bao.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenDecimals,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
          refUrl,
          poolType,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenDecimals,
          tokenSymbol,
          tokenContract,
          earnToken: 'BAO',
          earnTokenAddress: bao.contracts.bao.options.address,
          icon,
          refUrl,
          poolType,
        }),
      )
    : [];

export const getPoolWeight = async (masterChefContract, pid) => {
  const [{ allocPoint }, totalAllocPoint] = await Promise.all([
    masterChefContract.methods.poolInfo(pid).call(),
    masterChefContract.methods.totalAllocPoint().call(),
  ]);

  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint));
};

export const getEarned = async (masterChefContract, pid, account) =>
  masterChefContract.methods.pendingReward(pid, account).call();

export const getLockedEarned = async (baoContract, account) =>
  baoContract.methods.lockOf(account).call();

export const getTotalLPWethValue = async (
  bao,
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  tokenDecimals,
  pid,
  account
) => {
  const [
    tokenAmountWholeLP,
    balance,
    totalSupply,
    lpContractWeth,
    poolWeight,
    farms,
    staked
  ] = await Promise.all([
    tokenContract.methods.balanceOf(lpContract.options.address).call(),
    lpContract.methods.balanceOf(masterChefContract.options.address).call(),
    lpContract.methods.totalSupply().call(),
    wethContract.methods.balanceOf(lpContract.options.address).call(),
    getPoolWeight(masterChefContract, pid),
    getFarms(bao),
    masterChefContract.methods.userInfo(pid, account).call()
  ]);

  /*const reserves = await lpContract.methods.getReserves().call();
  const tokenAddress0 = await lpContract.methods.token0().call();
  const tokenAddress1 = await lpContract.methods.token1().call();

  console.log(tokenAddress0);

  const token0Contract = new bao.web3.eth.Contract(erc20Abi, tokenAddress0);
  const token1Contract = new bao.web3.eth.Contract(erc20Abi, tokenAddress1);
  const token0Decimals = await token0Contract.methods.decimals().call();
  const token1Decimals = await token1Contract.methods.decimals().call();
  const token0Symbol = await token0Contract.methods.symbol().call();
  const token1Symbol = await token1Contract.methods.symbol().call();

  console.log("BALANCES: (" + token0Symbol + " - " + (reserves['_reserve0'] /
    (10 ** parseInt(token0Decimals))) + ")" + " / (" + token1Symbol + " - "
    (reserves['_reserve1'] / (10 ** parseInt(token1Decimals))) + ")");*/

  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply));
  const lpWethWorth = new BigNumber(lpContractWeth);
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2));
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals));

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
  .div(new BigNumber(10).pow(18));

  /* if (pid === 1) {
    lpContract.methods.getReserves().call().then(reserves => {
      const token1 = reserves['_reserve0'] / (10 ** 18);
      const token2 = reserves['_reserve1'] / (10 ** 18);

      const farm = _.findWhere(farms, { pid: pid });
      const lpTokenStr = farm.lpToken.split(' ')[0].split('-');
      const token1Str = lpTokenStr[0];
      const token2Str = lpTokenStr[1];

      fetch('https://api.coingecko.com/api/v3/coins/list')
        .then(response => response.json())
        .then(data => {
          const token1Id = _.findWhere(data, { symbol: token1Str.toLowerCase() }).id;
          const token2Id = _.findWhere(data, { symbol: token2Str.toLowerCase() }).id;

          fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=' + token1Id + ','
            + token2Id + '&vs_currencies=usd&include_24hr_change=true',
          )
            .then(response => response.json())
            .then(priceData => {
              const total = priceData[token1Id].usd * token2 + priceData[token2Id].usd * token1;
              console.log(total);
            });
        });
    })
  } */

  return {
    tokenAmount,
    wethAmount,
    pid: pid,
    totalSupply: totalSupply,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    staked: staked,
    poolWeight,
  };
};

export const approve = async (lpContract, masterChefContract, account) =>
  lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account });

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call();
    return new BigNumber(amount);
  } catch {
    return new BigNumber(0);
  }
};

export const getWethPrice = async bao => {
  const amount = await bao.contracts.wethPrice.methods.latestAnswer().call();
  return new BigNumber(amount);
};

export const getBaoPrice = async bao => {
  const addr = '0xdcf3aC78f37098222C53C79974faaC5ce1aaF707';
  const amount = await bao.contracts.baoPrice.methods
    .consult(addr.toString(), 1)
    .call();
  return new BigNumber(amount);
};

export const getBaoSupply = async bao =>
  new BigNumber(await bao.contracts.bao.methods.totalSupply().call());

export const getReferrals = async (masterChefContract, account) =>
  await masterChefContract.methods.getGlobalRefAmount(account).call();

export const redeem = async (masterChefContract, account) => {
  const now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', tx => {
        console.log(tx);
        return tx.transactionHash;
      });
  }
  alert('pool not active');
};
