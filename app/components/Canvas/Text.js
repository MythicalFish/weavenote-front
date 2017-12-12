import React, { PropTypes } from 'react';
import { TextPath } from 'react-konva';
import { colors } from './constants';
import { pointsToPath } from './utils';

export default function CanvasText(props) {
  const color = props.color || colors.green;
  const { value, points } = props;
  const path = pointsToPath(points);
  return (
    <TextPath
      offsetY={25}
      text={value}
      fill={color}
      fontSize={20}
      data={path}
    />
  );
}

CanvasText.propTypes = {
  points: PropTypes.array,
  value: PropTypes.string,
  color: PropTypes.string,
};
