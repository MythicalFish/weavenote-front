import React, { PropTypes } from 'react';
import { Group, Line } from 'react-konva';
import Text from './CanvasText';

export default function CanvasLine(props) {
  const { position, identifier, isVisible } = props;
  const color = '#42EA83';
  const points = [];
  let midpointX = 0;
  let midpointY = 0;
  position.forEach((pos) => {
    points.push(pos.x);
    points.push(pos.y);
    midpointX += pos.x;
    midpointY += pos.y;
  });
  midpointX /= 2;
  midpointY /= 2;
  const style = {};
  if (!isVisible) style.opacity = 0;
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
        {...style}
      />
      {identifier && (
        <Text value={identifier} x={midpointX} y={midpointY} color={color} />
      )}
    </Group>
  );
}

CanvasLine.propTypes = {
  position: PropTypes.array,
  identifier: PropTypes.string,
  isVisible: PropTypes.bool,
};
