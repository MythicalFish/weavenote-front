import React from 'react';
import { Circle } from 'react-konva';

export default function Line(props) {
  return (
    <Circle
      x={10}
      y={10}
      width={15}
      height={15}
      fill="#000"
      strokeWidth={2}
      stroke="#FFF"
      draggable="true"
    />
  );
}

Line.propTypes = {
  position: React.PropTypes.object,
};
