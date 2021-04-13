import React, { Component, useState, useEffect, forwardRef } from 'react'
import _ from 'underscore'

import DatePicker from 'react-datepicker'
import Chart from 'react-apexcharts'

import { InputGroup, ButtonGroup, FormControl, Button, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  ChartContainer,
  InlineDiv,
  CalendarButton,
  LabelButton
} from './styles/styled'

// Date Picker styles
import 'react-datepicker/dist/react-datepicker.css'

export default function App (props) {
  const [seriesData, setSeriesData] = useState([])
  const [totalCandles, setTotalCandles] = useState(-1)

  const now = new Date()

  const [minDate, setMinDate] = useState(now)
  const [startDate, setStartDate] = useState(now - (1000 * 60 * 60 * 48))
  const [endDate, setEndDate] = useState(now)

  const poolType = props.title === 'Pool APY (%)' ? 0 :
    props.title === 'Total Value Locked (USD)' ? 1 : 2
  const series = [{
    name: 'candle',
    data: seriesData
  }]
  const options = {
    chart: {
      height: 350,
      type: 'candlestick',
      style: {
        color: '#fff'
      }
    },
    title: {
      text: props.title,
      align: 'left',
      style: {
        color: '#fff'
      }
    },
    annotations: {
      xaxis: [
        /*{
          x: "4/11/2021 14:41",
          borderColor: '#3db880',
          label: {
            borderColor: '#3db880',
            style: {
              fontSize: '12px',
              color: '#fff',
              background: '#3db880'
            },
            orientation: 'horizontal',
            offsetY: 7,
            text: 'Beginning of candles'
          }
        }*/
      ]
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function(val) {
          var date = new Date(val)
          return date.toLocaleDateString("en-US") + ' ' + date.getHours() + ':' +
            date.getMinutes()
        },
        color: '#fff'
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }

  useEffect(() => {
    const API_LINK = poolType === 0 ?
      'https://api.baoview.xyz/api/v1/pool-metrics/apy?pid=' :
      poolType === 1 ? 'https://api.baoview.xyz/api/v1/pool-metrics/pool-value?pid=' :
      'https://api.baoview.xyz/api/v1/pool-metrics/baocx-per-day?pid='
    const startDateStr = new Date(startDate).toISOString()
    const endDateStr = new Date(endDate).toISOString()

    fetch(API_LINK + props.pid + '&start=' + startDateStr + '&end=' + endDateStr)
      .then(response => response.json())
      .then((res) => {
        const candleData = []

        _.each(
          poolType === 0 ? res.apy : poolType === 1 ? res.totalLockedValue :
            res.baoCxPerDay,
          (candle) => {
            candleData.push({
              x: new Date(candle.date),
              y: [
                Math.round(candle.o * 100) / 100,
                Math.round(candle.h * 100) / 100,
                Math.round(candle.l * 100) / 100,
                Math.round(candle.c * 100) / 100
              ]
            })
          }
        )

        var newSeriesData = []
        _.each(candleData, (dp) => {
          if (dp.x >= startDate && dp.x <= endDate) newSeriesData.push(dp)
        })

        return setSeriesData(newSeriesData)
      })
  }, [startDate, endDate])

  const CustomDateInput = forwardRef(
    ({ value, type, onClick }, ref) => (
      <ButtonGroup>
        {type === 'start' && (
          <LabelButton style={{borderRight: 'none'}} onClick={onClick}>
            Start Date
          </LabelButton>
        )}
        <CalendarButton variant="outline-success" onClick={onClick} ref={ref}>
          <FontAwesomeIcon
            icon={['fas', 'calendar-alt']}
          /> {value}
        </CalendarButton>
        {type === 'end' && (
          <LabelButton style={{borderLeft: 'none'}} onClick={onClick}>
            End Date
          </LabelButton>
        )}
      </ButtonGroup>
    ),
  )

  return (
    <ChartContainer>
      <Chart options={options} series={series} type="candlestick" height={350} />
      <center>
        <InlineDiv>
          <DatePicker selected={startDate} onChange={date => { date.setHours(0,0,0,0); setStartDate(date) }}
            selectsStart startDate={startDate} endDate={endDate}
            customInput={<CustomDateInput type="start" />}
          />
        </InlineDiv>
        <InlineDiv className='ml-2'>
          <Badge variant="warning">{seriesData.length} 1h candles displaying</Badge>
        </InlineDiv>
        <InlineDiv className='ml-2'>
          <DatePicker selected={endDate} onChange={date => {date.setHours(23,59,59,0); setEndDate(date)}}
            selectsStart startDate={startDate} endDate={endDate} minDate={startDate}
            maxDate={new Date()} className="mt-2"
            customInput={<CustomDateInput type="end" />}
          />
        </InlineDiv>
      </center>
    </ChartContainer>
  )
}
