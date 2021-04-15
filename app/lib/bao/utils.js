import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

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
          lpAddressMainnet,
          lpContract,
          refUrl,
          poolType,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpTokenAddressMainnet: lpAddressMainnet,
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
  account,
) => {
  const [
    tokenAmountWholeLP,
    balance,
    totalSupply,
    lpContractWeth,
    poolWeight,
    staked,
  ] = await Promise.all([
    tokenContract.methods.balanceOf(lpContract.options.address).call(),
    lpContract.methods.balanceOf(masterChefContract.options.address).call(),
    lpContract.methods.totalSupply().call(),
    wethContract.methods.balanceOf(lpContract.options.address).call(),
    getPoolWeight(masterChefContract, pid),
    masterChefContract.methods.userInfo(pid, account).call(),
  ]);

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

  return {
    tokenAmount,
    wethAmount,
    pid,
    totalSupply,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    staked,
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

export const getUserInfo = async (masterChefContract, pid, account) =>
  new Promise(async resolve => {
    const userInfo = await masterChefContract.methods
      .userInfo(pid, account)
      .call();
    resolve(userInfo);
  });

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
  new Promise(async resolve => {
    const refAmount = await masterChefContract.methods
      .getGlobalRefAmount(account)
      .call();
    resolve(refAmount);
  });
