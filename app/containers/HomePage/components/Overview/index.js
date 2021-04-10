import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'

import {
  OverviewContainer,
  OverviewStats,
  OverviewHeading,
  OverviewCol,
  QuestionIcon
} from './styles/styled'
import TokenPrice from './components/TokenPrice/Loadable'

import useAllEarnings from '../../../../hooks/useAllEarnings'
import useLockedEarnings from '../../../../hooks/useLockedEarnings'
import useLPTotalUSDValue from '../../../../hooks/useLPTotalUSDValue'

import useBao from '../../../../hooks/useBao'
import useMainnetWeb3 from '../../../../hooks/useMainnet'

import { getDisplayBalance } from '../../../../lib/formatBalance'

import useAllFarmTVL from '../../../../hooks/useAllFarmTVL'

import SushiIcon from '../../../../images/sushiswap.png'
import BaoIcon from '../../../../images/favicon-32x32.png'

export default function Overview() {
  const earnings = useAllEarnings()
  const lockedEarnings = useLockedEarnings()
  const lpTotalUSDValue = useLPTotalUSDValue()

  const bao = useBao()
  const web3 = useMainnetWeb3()

  const totalLocked = useAllFarmTVL()

  const [baoPrice, setBaoPrice] = useState(-1)
  const [ethPrice, setEthPrice] = useState(-1)
  const [daiPrice, setDaiPrice] = useState(-1)
  const [baoPriceChange, setBaoPriceChange] = useState('secondary')
  const [ethPriceChange, setEthPriceChange] = useState('secondary')

  useEffect(() => {
    // https://api.nomics.com/v1/currencies/ticker?key=45298ab851ffac5e118fce2b805a2a3a&ids=BAO&convert=USD
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bao-finance,ethereum,dai&vs_currencies=usd&include_24hr_change=true',
      { 'Access-Control-Allow-Origin': '*' },
    )
      .then(response => response.json())
      .then(data => {
        setEthPrice(data.ethereum.usd)
        setDaiPrice(data.dai.usd)
        setBaoPrice(data['bao-finance'].usd)

        setEthPriceChange(data.ethereum.usd_24h_change)
        setBaoPriceChange(data['bao-finance'].usd_24h_change)
      })
  }, [])

  let sumEarning = -1
  for (const earning of earnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const Loading = () => {
    return (
      <Spinner animation="border" size="sm" />
    )
  }

  return (
    <>
      <OverviewContainer>
        <OverviewHeading
          mainnet={web3.currentProvider.connected}
          xdai={bao.web3.currentProvider.isConnected()}
        />
        <OverviewStats>
          <OverviewCol>
            Total Locked Bao
            <br/>
            {(lockedEarnings <= 0 || baoPrice === -1 || daiPrice === -1) ? (
              <Badge variant="secondary"><Loading /></Badge>
            ) : (
              <span>
                <b>{getDisplayBalance(lockedEarnings)} Bao.cx</b>
                <br/>
                <Badge variant="success">
                  $
                  {getDisplayBalance(
                    new BigNumber(
                      baoPrice * lockedEarnings.div(new BigNumber(10).pow(18)),
                    ),
                    0,
                  )}
                  {` | ${getDisplayBalance(
                    new BigNumber(baoPrice)
                      .times(lockedEarnings.div(new BigNumber(10).pow(18)))
                      .div(new BigNumber(daiPrice)),
                    0,
                  )} DAI`}
                </Badge>
              </span>
            )}
          </OverviewCol>
          <OverviewCol>
            Total Value of LP Staked
            <br/>
            <Badge variant={lpTotalUSDValue === -1 ? 'secondary' : 'success'}>
              {(lpTotalUSDValue === -1 || daiPrice === -1) ? <Loading /> : (
                <>
                  ${getDisplayBalance(new BigNumber(lpTotalUSDValue), 0)}
                  {' | '}
                  {getDisplayBalance(new BigNumber(lpTotalUSDValue).div(daiPrice), 0)} DAI
                </>
              )}
            </Badge>
          </OverviewCol>
          <OverviewCol>
            Pending Harvest
            <br />
            {(sumEarning === -1 || baoPrice === -1) && (<Badge variant="secondary"><Loading /></Badge>)}
            {baoPrice !== -1 && sumEarning >= 0 && (
              <span>
                <b>{getDisplayBalance(new BigNumber(sumEarning), 0)} Bao.cx</b>
                {' '}
                <OverlayTrigger
                  overlay={<Tooltip>Harvest with one click on xdai.farms</Tooltip>}
                  placement="top"
                >
                  <a href="https://xdai.farm/#/chef">
                    <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
                  </a>
                </OverlayTrigger>
                <br />
                <Badge variant="success">
                  ${getDisplayBalance(new BigNumber(baoPrice * sumEarning), 0)} |{' '}
                  {`${getDisplayBalance(
                    new BigNumber(baoPrice * sumEarning).div(daiPrice),
                    0,
                  )} DAI`}
                </Badge>
              </span>
            )}
          </OverviewCol>
          <OverviewCol>
            BAO Price
            <br />
            <TokenPrice price={baoPrice} priceChange={baoPriceChange} rocket />
          </OverviewCol>
          <OverviewCol>
            Total Value{' '}
            <QuestionIcon title="Locked BAO + Pending Harvest + Value of LP Staked" />
            <br/>
            <Badge variant={lpTotalUSDValue === -1 ? 'secondary' : 'success'}>
              {(lpTotalUSDValue === -1 || baoPrice === -1 || lockedEarnings <= 0)
              ? <Loading /> : (
                <>
                  ${getDisplayBalance(
                    new BigNumber(
                      lpTotalUSDValue + (baoPrice * sumEarning) +
                      (baoPrice * lockedEarnings.div(new BigNumber(10).pow(18)))
                    ), 0
                  )}{' | '}
                  {getDisplayBalance(
                    new BigNumber(
                      lpTotalUSDValue + (baoPrice * sumEarning) +
                      (baoPrice * lockedEarnings.div(new BigNumber(10).pow(18)))
                    ).div(new BigNumber(daiPrice)), 0
                  )} DAI
                </>
              )}
            </Badge>
          </OverviewCol>
          <OverviewCol>
            ETH Price
            <br />
            <TokenPrice price={ethPrice} priceChange={ethPriceChange} />
          </OverviewCol>
        </OverviewStats>
      </OverviewContainer>
      <OverviewContainer>
        <OverviewStats>
          <OverviewCol>
            All Locked <img src={BaoIcon} style={{height: '1em'}}></img> LP
            {' '}
            <QuestionIcon title="Total locked value in Bao LPs on Bao Finance (xDai only)" />
            <br />
            <Badge variant={totalLocked === -1 ? 'secondary' : 'warning'} style={{color: '#000'}}>
              {totalLocked === -1 ? <Loading /> : '$' + getDisplayBalance(new BigNumber(totalLocked.baoLPTvlUsd), 0)}
            </Badge>
          </OverviewCol>
          <OverviewCol>
            All Locked LP <QuestionIcon title="Total locked value in Bao LPs and Sushi LPs on Bao Finance (xDai only)" />
            <br />
            <Badge variant={totalLocked === -1 ? 'secondary' : 'info'}>
              {totalLocked === -1 ? <Loading /> : '$' + getDisplayBalance(new BigNumber(totalLocked.sushiLPTvlUsd + totalLocked.baoLPTvlUsd), 0)}
            </Badge>
          </OverviewCol>
          <OverviewCol>
            All Locked <img src={SushiIcon} style={{height: '1em'}}></img> LP
            {' '}
            <QuestionIcon title="Total locked value in Sushi LPs on Bao Finance (xDai only)" />
            <br />
            <Badge style={{backgroundColor: (totalLocked === -1 ? '#6c757d' : '#ee57a3')}}>
              {totalLocked === -1 ? <Loading /> : '$' + getDisplayBalance(new BigNumber(totalLocked.sushiLPTvlUsd), 0)}
            </Badge>
          </OverviewCol>
        </OverviewStats>
      </OverviewContainer>
    </>
  );
}
