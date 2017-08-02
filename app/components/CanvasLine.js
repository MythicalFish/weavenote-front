import React, { PropTypes } from 'react';
import { Group, Line } from 'react-konva';
import { pixelPosition } from 'utils/anchorPosition';
import Text from './CanvasText';

export default function CanvasLine({ anchors, canvasSize, identifier }) {
  const color = '#42EA83';
  const points = [];
  let midpointX = 0;
  let midpointY = 0;
  anchors.forEach((anchor) => {
    const pos = pixelPosition(anchor.toJS(), canvasSize);
    points.push(pos.x);
    points.push(pos.y);
    midpointX += pos.x;
    midpointY += pos.y;
  });
  midpointX /= 2;
  midpointY /= 2;
  return (
    <Group>
      <Line
        x={0}
        y={0}
        points={points}
        stroke={color}
        strokeWidth={3}
        dash={[10, 5]}
        lineCap="round"
      />
      {identifier &&
        <Text value={identifier} x={midpointX} y={midpointY} color={color} />}
    </Group>
  );
}

CanvasLine.propTypes = {
  anchors: PropTypes.object,
  canvasSize: PropTypes.object,
  identifier: PropTypes.string,
};
