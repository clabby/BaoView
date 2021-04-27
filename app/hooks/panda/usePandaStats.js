import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import BigNumber from 'bignumber.js';

/*
 * ABIs
 */
import erc20Abi from '../../lib/bao/lib/abi/erc20.json';
import lpAbi from '../../lib/bao/lib/abi/uni_v2_lp.json';

/*
 * Constants
 */
import supportedPools from '../../lib/panda/supportedPools';
import { decimate } from '../../lib/formatBalance';

const MASTER_CHEF_ADDRESS = '0x9942cb4c6180820E6211183ab29831641F58577A';

// BSC has an approx 3s block time
// 365 * 24 * 60 * (60 / 3) = 10512000
// (365 / 12) * 24 * 60 * (60 / 3) = 876000
// (365 / 52) * 24 * 60 * (60 / 3) = 20214
const BLOCKS_PER_YEAR = new BigNumber(10512000);
const BLOCKS_PER_MONTH = new BigNumber(876000);
const BLOCKS_PER_WEEK = new BigNumber(20214);

const getOraclePrice = async (tokenSymbol, priceOracles) => {
  const [tokenPrice, tokenDecimals] = await Promise.all([
    priceOracles[tokenSymbol].contract.methods.latestAnswer().call(),
    priceOracles[tokenSymbol].contract.methods.decimals().call(),
  ]);

  return [tokenPrice, tokenDecimals];
};

const pndaPriceUsd = async (web3, masterChefContract, priceOracles) => {
  const [resultA, resultB, resultC, resultD, resultE] = await Promise.all([
    getPandaStats(0, web3, masterChefContract, priceOracles, null, false),
    getPandaStats(1, web3, masterChefContract, priceOracles, null, false),
    getPandaStats(2, web3, masterChefContract, priceOracles, null, false),
    getPandaStats(3, web3, masterChefContract, priceOracles, null, false),
    getPandaStats(4, web3, masterChefContract, priceOracles, null, false),
  ]);

  return resultA.nonOraclePrice
    .plus(resultB.nonOraclePrice)
    .plus(resultC.nonOraclePrice)
    .plus(resultD.nonOraclePrice)
    .plus(resultE.nonOraclePrice)
    .div(5)
    .toNumber();
};

const getPandaStats = async (
  pid,
  web3,
  masterChefContract,
  priceOracles,
  pndaPrice,
  includeRoi = true,
) => {
  const pool = _.find(supportedPools, { pid });

  const lpAddress = pool.lpAddresses[56];
  const lpContract = new web3.eth.Contract(lpAbi, lpAddress);

  // Get token addresses from LP Contract
  const [token0, token1] = await Promise.all([
    lpContract.methods.token0().call(),
    lpContract.methods.token1().call(),
  ]);

  // Create token contracts
  const token0Contract = new web3.eth.Contract(erc20Abi, token0);
  const token1Contract = new web3.eth.Contract(erc20Abi, token1);

  // Get token symbols/decimals and LP contract reserves
  const [
    token0Symbol,
    token0Decimals,
    token1Symbol,
    token1Decimals,
    reserves,
  ] = await Promise.all([
    token0Contract.methods.symbol().call(),
    token0Contract.methods.decimals().call(),
    token1Contract.methods.symbol().call(),
    token1Contract.methods.decimals().call(),
    lpContract.methods.getReserves().call(),
  ]);

  // Check which underlying asset inside of the LP Token has a price oracle
  const oracleToken = _.includes(_.keys(priceOracles), token0Symbol);
  const [oracleTokenPrice, oracleTokenDecimals] = oracleToken
    ? await getOraclePrice(token0Symbol, priceOracles)
    : await getOraclePrice(token1Symbol, priceOracles);

  const tvl = decimate(new BigNumber(reserves[oracleToken ? 0 : 1]))
    .times(
      decimate(new BigNumber(oracleTokenPrice), oracleTokenDecimals).toNumber(),
    )
    .times(2)
    .toNumber()
    .toFixed(2);

  // Get reward per block, total LP supply, and total LP locked
  const [reward, totalSupply, totalLocked] = await Promise.all([
    masterChefContract.methods.getNewRewardPerBlock(pool.pid + 1).call(),
    lpContract.methods.totalSupply().call(),
    lpContract.methods.balanceOf(MASTER_CHEF_ADDRESS).call(),
  ]);

  if (includeRoi) {
    const lockedPercentage = new BigNumber(totalLocked)
      .div(new BigNumber(totalSupply))
      .times(100)
      .toNumber()
      .toFixed(2);

    const lockedUsd = tvl * (lockedPercentage / 100);
    const decimatedReward = decimate(
      new BigNumber(reward),
      17 /* pnda decimals - 1 */,
    );

    const roi = {
      apy: new BigNumber(pndaPrice)
        .times(decimatedReward)
        .times(BLOCKS_PER_YEAR)
        .div(lockedUsd),
      mpy: new BigNumber(pndaPrice)
        .times(decimatedReward)
        .times(BLOCKS_PER_MONTH)
        .div(lockedUsd),
      wpy: new BigNumber(pndaPrice)
        .times(decimatedReward)
        .times(BLOCKS_PER_WEEK)
        .div(lockedUsd),
    };

    return { lockedUsd, roi };
  }

  const token = oracleToken ? 1 : 0;
  const nonOraclePrice = new BigNumber(tvl / 2).div(
    decimate(
      new BigNumber(reserves[token]),
      oracleToken ? token1Decimals : token0Decimals,
    ),
  );

  return { nonOraclePrice };
};

const usePandaStats = (
  pid,
  web3,
  masterChefContract,
  priceOracles,
  pndaPrice,
) => {
  const [pandaStats, setPandaStats] = useState(undefined);

  const getStats = useCallback(async () => {
    if (!pndaPrice) return;

    const fetched = await getPandaStats(
      pid,
      web3,
      masterChefContract,
      priceOracles,
      pndaPrice,
    );
    setPandaStats(fetched);
  }, [pid, pndaPrice]);

  useMemo(() => {
    getStats();
  }, [pid, pndaPrice]);

  return pandaStats;
};

const usePndaPrice = (web3, masterChefContract, priceOracles) => {
  const [pndaPrice, setPndaPrice] = useState(undefined);

  const fetchPndaPrice = useCallback(async () => {
    const fetched = await pndaPriceUsd(web3, masterChefContract, priceOracles);
    setPndaPrice(fetched);
  }, []);

  useMemo(() => {
    fetchPndaPrice();
  }, []);

  return pndaPrice;
};

export { usePandaStats, usePndaPrice };