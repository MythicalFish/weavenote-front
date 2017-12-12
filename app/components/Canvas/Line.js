import React, { PropTypes } from 'react';
import { Line } from 'react-konva';
import { lineTheme } from './utils';

export default function CanvasLine(props) {
  const theme = lineTheme(props);
  return (
    <Line
      x={0}
      y={0}
      points={props.points}
      strokeWidth={3}
      dash={[10, 5]}
      lineCap="round"
      {...theme}
    />
  );
}

CanvasLine.propTypes = {
  points: PropTypes.array,
};
