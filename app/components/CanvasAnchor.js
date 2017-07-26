import React from 'react';
import { Circle } from 'react-konva';

export default function Anchor({ position, onDragEnd }) {
  return (
    <Circle
      x={position.x}
      y={position.y}
      width={15}
      height={15}
      fill="#51b2fe"
      strokeWidth={2}
      stroke="#FFF"
      draggable="true"
      onDragEnd={onDragEnd}
    />
  );
}

Anchor.propTypes = {
  position: React.PropTypes.object,
  onDragEnd: React.PropTypes.func,
};
