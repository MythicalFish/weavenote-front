import React from 'react';
import { Line } from 'react-konva';
import { pixelPosition } from 'utils/anchorPosition';

export default function CanvasLine({ anchors, canvasSize }) {
  const a1 = pixelPosition(anchors.get('0'), canvasSize);
  const a2 = pixelPosition(anchors.get('1'), canvasSize);
  return (
    <Line
      x={0}
      y={0}
      points={[a1.x, a1.y, a2.x, a2.y]}
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
