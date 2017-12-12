import React, { PropTypes } from 'react';
import { Line } from 'react-konva';
import { lineStyle } from './utils';

export default function CanvasLine(props) {
  const theme = lineStyle(props);
  return (
    <Line
      x={0}
      y={0}
      points={props.points}
      dash={[10, 5]}
      lineCap="round"
      {...theme}
    />
  );
}

CanvasLine.propTypes = {
  points: PropTypes.array,
};
