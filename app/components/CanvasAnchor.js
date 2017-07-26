import React from 'react';
import { Circle } from 'react-konva';

export default function Anchor({ anchor, setAnnotation }) {
  return (
    <Circle
      x={anchor.get('x')}
      y={anchor.get('y')}
      width={15}
      height={15}
      fill="#51b2fe"
      strokeWidth={2}
      stroke="#FFF"
      draggable="true"
      onDragEnd={setAnnotation}
    />
  );
}

Anchor.propTypes = {
  anchor: React.PropTypes.object,
  setAnnotation: React.PropTypes.func,
};
