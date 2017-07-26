import React from 'react';
import { Line } from 'react-konva';

export default function CanvasLine({ anchors }) {
  const a1 = anchors.get('0');
  const a2 = anchors.get('1');
  return (
    <Line
      x={0}
      y={0}
      points={[a1.get('x'), a1.get('y'), a2.get('x'), a2.get('y')]}
      stroke="#51b2fe"
      strokeWidth={3}
      // shadowColor="white"
      // shadowBlur={0}
      // shadowOffset={{ x: 2, y: 2 }}
    />
  );
}

CanvasLine.propTypes = {
  anchors: React.PropTypes.object,
};
