import React from 'react';
import { Line } from 'react-konva';
import { pixelPosition } from 'utils/anchorPosition';

export default function CanvasLine({ anchors, canvasSize }) {
  const points = [];
  anchors.forEach((anchor) => {
    const pos = pixelPosition(anchor.toJS(), canvasSize);
    points.push(pos.x);
    points.push(pos.y);
  });
  return (
    <Line
      x={0}
      y={0}
      points={points}
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
  canvasSize: React.PropTypes.object,
};
