import React, { PropTypes } from 'react';
import { Arrow } from 'react-konva';
import { lineStyle } from './utils';

export default function CanvasArrow(props) {
  const theme = lineStyle(props);
  return (
    <Arrow
      x={0}
      y={0}
      points={props.points}
      pointerLength={10}
      pointerWidth={10}
      {...theme}
    />
  );
}

CanvasArrow.propTypes = {
  points: PropTypes.array,
};
