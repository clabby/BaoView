import React, { Component, useState, useEffect, forwardRef } from 'react';
import _ from 'underscore';

import DatePicker from 'react-datepicker';
import Chart from 'react-apexcharts';

import { InputGroup, FormControl, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'react-datepicker/dist/react-datepicker.css';

export default function App (props) {
  const [seriesData, setSeriesData] = useState([]);
  const [totalCandles, setTotalCandles] = useState(-1);

  const now = new Date();

  const [minDate, setMinDate] = useState(now);
  const [startDate, setStartDate] = useState(now - (1000 * 60 * 60 * 48));
  const [endDate, setEndDate] = useState(now);

  const poolType = props.title === 'Pool APY (%)';
  const series = [{
    name: 'candle',
    data: seriesData
  }];
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
      // ...
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function(val) {
          var date = new Date(val);
          return date.toLocaleDateString("en-US") + ' ' + date.getHours() + ':' +
            date.getMinutes();
        },
        color: '#fff'
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  useEffect(() => {
    const API_LINK = poolType ?
      'https://api.baoview.xyz/api/v1/pool-metrics/apy?pid=' :
      'https://api.baoview.xyz/api/v1/pool-metrics/pool-value?pid=';

    fetch(API_LINK + props.pid)
      .then(response => response.json())
      .then((res) => {
        const candleData = [];

        _.each(res.data, (candle) => {
          candleData.push({
            x: new Date(candle.date),
            y: [candle.o, candle.h, candle.l, candle.c]
          });
        });

        var newSeriesData = [];
        _.each(candleData, (dp) => {
          if (dp.x >= startDate && dp.x <= endDate) newSeriesData.push(dp);
        });

        return setSeriesData(newSeriesData);
      });
  }, [startDate, endDate]);

  const CustomDateInput = forwardRef(
    ({ value, onClick }, ref) => (
      <Button variant="success" onClick={onClick} ref={ref}>
        <FontAwesomeIcon
          icon={['fas', 'calendar-alt']}
        /> {value}
      </Button>
    ),
  );

  return (
    <div className="chart">
      <Chart options={options} series={series} type="candlestick" height={350} />
      <center>
          <div style={{display: 'inline-block'}}>
            <h5>Start Date:</h5>
            <DatePicker selected={startDate} onChange={date => { date.setHours(0,0,0,0); setStartDate(date) }}
              selectsStart startDate={startDate} endDate={endDate}
              customInput={<CustomDateInput />} />
          </div>
          <div style={{display: 'inline-block'}} className='ml-2'>
            <Badge variant="warning">{seriesData.length} 1h candles displaying</Badge>
          </div>
          <div style={{display: 'inline-block'}} className='ml-2'>
            <h5>End Date:</h5>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)}
              selectsStart startDate={startDate} endDate={endDate} minDate={startDate}
              maxDate={new Date()} className="mt-2" customInput={<CustomDateInput />} />
          </div>
      </center>
    </div>
  );
}
