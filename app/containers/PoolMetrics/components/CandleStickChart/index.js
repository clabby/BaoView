import React, { Component, useState, useEffect } from 'react';
import _ from 'underscore';

import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Chart from 'react-apexcharts';;

export default function App (props) {
  const [seriesData, setSeriesData] = useState([]);
  const [candleInput, setCandleInput] = useState(50);
  const [totalCandles, setTotalCandles] = useState(-1);

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

        const candleDataLength = candleData.length;
        setTotalCandles(candleData.length);
        if (candleInput > candleDataLength) setCandleInput(candleDataLength);

        return setSeriesData(candleData.slice(-candleInput));
      });
  }, [candleInput]);

  function handleCandleInputClick (e) {
    var str = e.target.value;

    if (str === '') setCandleInput(50);
    if (!isNaN(str) && !isNaN(parseFloat(str))) setCandleInput(parseInt(str));
  }

  return (
    <div className="chart">
      <Chart options={options} series={series} type="candlestick" height={350} />
      <center>
        <InputGroup>
          <FormControl
            placeholder="# of candles (default=50)"
            aria-label="# of candles"
            onChange={handleCandleInputClick}
            style={{width: '35%'}}
          />
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon2">
              <span class="badge badge-info" style={{color: '#fff'}}>
                {totalCandles === -1 ? 'Loading...' : totalCandles + ' 1h Candles'}
              </span>
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </center>
    </div>
  );
}
