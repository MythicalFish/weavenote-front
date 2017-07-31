import React from 'react';
import { Circle } from 'react-konva';

export default function Anchor({ position, onDragEnd, draggable, active }) {
  return (
    <Circle
      x={position.x}
      y={position.y}
      width={22}
      height={22}
      fill={active ? '#51b2fe' : '#CCC'}
      strokeWidth={3}
      stroke="#FFF"
      draggable={draggable}
      onDragEnd={onDragEnd}
    />
  );
}

Anchor.propTypes = {
  active: React.PropTypes.bool,
  draggable: React.PropTypes.bool,
  position: React.PropTypes.object,
  onDragEnd: React.PropTypes.func,
};
