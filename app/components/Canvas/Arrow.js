import React, { PropTypes } from 'react';
import { Arrow } from 'react-konva';
import { lineTheme } from './utils';

export default function CanvasArrow(props) {
  const theme = lineTheme(props);
  return (
    <Arrow
      x={0}
      y={0}
      points={props.points}
      strokeWidth={3}
      lineCap="round"
      pointerLength={10}
      pointerWidth={10}
      {...theme}
    />
  );
}

CanvasArrow.propTypes = {
  points: PropTypes.array,
};
