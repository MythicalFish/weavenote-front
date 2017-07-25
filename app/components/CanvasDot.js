import React from 'react';
import { Circle } from 'react-konva';

export default function Dot(props) {
  return (
    <Circle
      x={props.position.x}
      y={props.position.y}
      width={15}
      height={15}
      fill="#51b2fe"
    />
  );
}

Dot.propTypes = {
  position: React.PropTypes.object,
};
