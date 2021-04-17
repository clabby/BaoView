import React, { useState, useEffect, forwardRef } from 'react';
import _ from 'underscore';

import DatePicker from 'react-datepicker';
import Chart from 'react-apexcharts';

import { ButtonGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  ChartContainer,
  InlineDiv,
  GreyButton,
  LabelButton,
} from './styles/styled';

// Date Picker styles
import 'react-datepicker/dist/react-datepicker.css';

export default function App(props) {
  const [seriesData, setSeriesData] = useState([]);

  const now = new Date();
  const [startDate, setStartDate] = useState(now - 1000 * 60 * 60 * 48);
  const [endDate, setEndDate] = useState(now);
  const [timeFrame, setTimeFrame] = useState('1h');

  /* eslint-disable */
  const poolType =
    props.title === 'Pool APY (%)'
      ? 0
      : props.title === 'Total Value Locked (USD)'
        ? 1
        : 2;
  /* eslint-enable */
  const series = [
    {
      name: 'candle',
      data: seriesData,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: 'candlestick',
      style: {
        color: '#fff',
      },
    },
    title: {
      text: props.title,
      align: 'left',
      style: {
        color: '#fff',
      },
    },
    annotations: {
      xaxis: [
        // ...
      ],
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter(val) {
          const date = new Date(val);
          return `${date.toLocaleDateString(
            'en-US',
          )} ${date.getHours()}:${date.getMinutes()}`;
        },
        color: '#fff',
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  useEffect(() => {
    /* eslint-disable */
    const API_LINK = poolType === 0 ?
      'https://api.baoview.xyz/api/v1/pool-metrics/apy?pid=' :
      (poolType === 1 ? 'https://api.baoview.xyz/api/v1/pool-metrics/pool-value?pid=' :
        'https://api.baoview.xyz/api/v1/pool-metrics/baocx-per-day?pid=');
    /* eslint-enable */
    const startDateStr = new Date(startDate).toISOString();
    const endDateStr = new Date(endDate).toISOString();

    fetch(
      `${API_LINK +
        props.pid}&start=${startDateStr}&end=${endDateStr}&timeframe=${timeFrame}`,
    )
      .then(response => response.json())
      .then(res => {
        const candleData = [];

        _.each(
          /* eslint-disable */
          poolType === 0
            ? res.apy
            : poolType === 1
              ? res.totalLockedValue
              : res.baoCxPerDay,
          /* eslint-enable */
          candle => {
            candleData.push({
              x: new Date(candle.date),
              y: [
                Math.round(candle.o * 100) / 100,
                Math.round(candle.h * 100) / 100,
                Math.round(candle.l * 100) / 100,
                Math.round(candle.c * 100) / 100,
              ],
            });
          },
        );

        const newSeriesData = [];
        _.each(candleData, dp => {
          if (dp.x >= startDate && dp.x <= endDate) newSeriesData.push(dp);
        });

        return setSeriesData(newSeriesData);
      });
  }, [startDate, endDate, timeFrame]);

  const CustomDateInput = forwardRef(
    // eslint-disable-next-line react/prop-types
    ({ value, type, onClick }, ref) => (
      <ButtonGroup>
        {type === 'start' && (
          <LabelButton style={{ borderRight: 'none' }} onClick={onClick}>
            Start Date
          </LabelButton>
        )}
        <GreyButton variant="outline-success" onClick={onClick} ref={ref}>
          <FontAwesomeIcon icon={['fas', 'calendar-alt']} /> {value}
        </GreyButton>
        {type === 'end' && (
          <LabelButton style={{ borderLeft: 'none' }} onClick={onClick}>
            End Date
          </LabelButton>
        )}
      </ButtonGroup>
    ),
  );

  return (
    <ChartContainer>
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
      <center>
        <InlineDiv>
          <DatePicker
            selected={startDate}
            onChange={date => {
              date.setHours(0, 0, 0, 0);
              setStartDate(date);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            customInput={<CustomDateInput type="start" />}
          />
        </InlineDiv>
        <InlineDiv className="ml-2">
          <Badge variant="warning">
            {seriesData.length} {timeFrame} candles displaying
          </Badge>
        </InlineDiv>
        <InlineDiv className="ml-2">
          <DatePicker
            selected={endDate}
            onChange={date => {
              date.setHours(23, 59, 59, 0);
              setEndDate(date);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            className="mt-2"
            customInput={<CustomDateInput type="end" />}
          />
        </InlineDiv>
        <br />
        <ButtonGroup>
          <GreyButton
            variant="outline-warning"
            onClick={() => setTimeFrame('1h')}
          >
            1h
          </GreyButton>
          <GreyButton
            variant="outline-success"
            onClick={() => setTimeFrame('4h')}
          >
            4h
          </GreyButton>
          <GreyButton variant="outline-info" onClick={() => setTimeFrame('1d')}>
            1d
          </GreyButton>
        </ButtonGroup>
      </center>
    </ChartContainer>
  );
}
