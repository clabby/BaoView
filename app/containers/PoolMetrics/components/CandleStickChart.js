import React, { Component, useState, useEffect } from 'react';
import _ from 'underscore';

import Chart from 'react-apexcharts';;

export default function App (props) {
  const [seriesData, setSeriesData] = useState([]);

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
    const API_LINK = props.title === 'Pool APY (%)' ?
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

        setSeriesData(candleData);
      });
  }, []);

  return (
    <div className="chart">
      <Chart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
}
