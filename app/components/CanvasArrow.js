import React, { PropTypes } from 'react';
import { Arrow } from 'react-konva';

const themes = {
  default: {
    stroke: '#42EA83',
    fill: '#42EA83',
  },
};

const activeColor = '#51b2fe';

export default function CanvasArrow(props) {
  const theme = themes[props.type] ? props.type : 'default';
  const style = { ...themes[theme] };
  if (props.isActive) {
    style.stroke = activeColor;
    style.fill = activeColor;
  }
  return (
    <Arrow
      x={0}
      y={0}
      points={props.points}
      strokeWidth={3}
      lineCap="round"
      pointerLength={10}
      pointerWidth={10}
      {...style}
    />
  );
}

CanvasArrow.propTypes = {
  isActive: PropTypes.bool,
  points: PropTypes.array,
  type: PropTypes.string,
};
