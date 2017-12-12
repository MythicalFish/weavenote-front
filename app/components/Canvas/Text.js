import React, { PropTypes } from 'react';
import { TextPath } from 'react-konva';
import { colors } from './constants';

export default function CanvasText(props) {
  const color = props.color || colors.green;
  const { value, data } = props;
  return <TextPath text={value} fill={color} fontSize={20} />;
}

CanvasText.propTypes = {
  data: PropTypes.array,
  value: PropTypes.string,
  color: PropTypes.string,
};
