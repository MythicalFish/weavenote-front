import React, { PropTypes } from 'react';
import { Line } from 'react-konva';

export default function CanvasLine(props) {
  const { points } = props;
  const color = '#42EA83';
  return (
    <Line
      x={0}
      y={0}
      points={points}
      stroke={color}
      strokeWidth={3}
      dash={[10, 5]}
      lineCap="round"
    />
  );
}

CanvasLine.propTypes = {
  points: PropTypes.array,
};
