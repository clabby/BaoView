import React, { useState } from 'react';
import BigNumber from 'bignumber.js';

import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { ParentSize } from '@visx/responsive';
import { darken } from 'polished';

import { Badge } from 'react-bootstrap';
import { ChartContainer } from './styles/styled';

import { getBalanceNumber } from '../../../../../../lib/formatBalance';

export default function BarChart({ data, title, formatNumber }) {
  const width = 300; // TODO - make dynamic
  const height = 200;
  const margin = { top: 0, bottom: 0, left: 0, right: 0 };

  // Bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Helpers
  const x = d => d.date;
  const y = d => d.c;

  // Scale graph by data.
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: data.map(x),
    padding: 0.1,
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(y))],
  });

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => compData => scale(accessor(compData));
  const xPoint = compose(
    xScale,
    x,
  );
  const yPoint = compose(
    yScale,
    y,
  );

  const [hover, setHover] = useState(undefined);

  const trailZero = str => `0${str}`.slice(-2);

  const getBadgeText = badgeData => (
    <>
      {formatNumber(getBalanceNumber(new BigNumber(badgeData.c), 0))}
      <br />
      {new Date(badgeData.date).getFullYear()}
      {'-'}
      {trailZero(new Date(badgeData.date).getMonth() + 1)}
      {'-'}
      {trailZero(new Date(badgeData.date).getDate() + 1)}
    </>
  );

  return (
    <ParentSize>
      {parent => (
        <ChartContainer>
          <Badge variant={hover ? 'info' : 'secondary'} className="mb-4">
            {title}
            <br />
            <br />
            {getBadgeText(hover || data[data.length - 1])}
          </Badge>
          <svg width={parent.width} height="175px">
            {data.map((d, i) => {
              const barHeight = yMax - yPoint(d);
              return (
                <Group key={`bar-${i}`}>
                  <Bar
                    x={xPoint(d)}
                    y={yMax - barHeight}
                    height={barHeight}
                    width={xScale.bandwidth()}
                    fill="#12a3b8"
                    onMouseOver={event => {
                      setHover(d);
                      event.target.setAttribute(
                        'fill',
                        darken(0.05, '#12a3b8'),
                      );
                    }}
                    onMouseOut={event => {
                      setHover(undefined);
                      event.target.setAttribute('fill', '#12a3b8');
                    }}
                  />
                </Group>
              );
            })}
          </svg>
        </ChartContainer>
      )}
    </ParentSize>
  );
}
