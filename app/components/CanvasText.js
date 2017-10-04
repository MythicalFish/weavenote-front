import React, { PropTypes } from 'react';
import { Text } from 'react-konva';

export default function CanvasText({ value, position, color }) {
  return <Text text={value} fill={color} fontSize={20} {...position} />;
}

CanvasText.propTypes = {
  position: PropTypes.object,
  value: PropTypes.string,
  color: PropTypes.string,
};
