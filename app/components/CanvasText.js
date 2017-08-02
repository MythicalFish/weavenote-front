import React, { PropTypes } from 'react';
import { Text } from 'react-konva';

export default function CanvasText({ value, x, y, color }) {
  return <Text x={x} y={y} text={value} fill={color} fontSize={20} />;
}

CanvasText.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  value: PropTypes.string,
  color: PropTypes.string,
};
