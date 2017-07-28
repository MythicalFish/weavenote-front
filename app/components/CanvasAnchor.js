import React from 'react';
import { Circle } from 'react-konva';

export default function Anchor({ position, onDragEnd, draggable }) {
  return (
    <Circle
      x={position.x}
      y={position.y}
      width={15}
      height={15}
      fill="#51b2fe"
      strokeWidth={2}
      stroke="#FFF"
      draggable={draggable}
      onDragEnd={onDragEnd}
    />
  );
}

Anchor.propTypes = {
  draggable: React.PropTypes.bool,
  position: React.PropTypes.object,
  onDragEnd: React.PropTypes.func,
};
