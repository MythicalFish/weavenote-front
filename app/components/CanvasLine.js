import React, { PropTypes } from 'react';
import { Line } from 'react-konva';

const themes = {
  default: {
    stroke: '#42EA83',
  },
};

const activeColor = '#51b2fe';

export default function CanvasLine(props) {
  const theme = themes[props.theme] ? props.theme : 'default';
  const style = { ...themes[theme] };
  if (props.isActive) style.stroke = activeColor;
  return (
    <Line
      x={0}
      y={0}
      points={props.points}
      strokeWidth={3}
      dash={[10, 5]}
      lineCap="round"
      {...style}
    />
  );
}

CanvasLine.propTypes = {
  isActive: PropTypes.bool,
  points: PropTypes.array,
  theme: PropTypes.string,
};
