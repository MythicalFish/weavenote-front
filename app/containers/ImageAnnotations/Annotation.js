import React, { PropTypes } from 'react';
import { Group } from 'react-konva';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition } from './utils';

const Annotation = (props) => {
  const { data, currentView, canvasSize } = props;
  const { id, anchors, type } = data.toObject();
  const anchorStyle = type === 'dot' ? 'default' : 'lineCap';
  if (type === 'line' && currentView !== 'Measurements') return <Group />;
  if (type !== 'line' && currentView === 'Measurements') return <Group />;
  const anchorPairs = [];
  anchors.forEach((anchor, index) => {
    if (index > 0) {
      const previous = anchors.get(index - 1);
      anchorPairs.push([previous, anchor]);
    }
  });
  const pos = (anchor) => pixelPosition(anchor.toJS(), canvasSize);
  return (
    <Group>
      {anchors.map((anchor, i) => (
        <Anchor
          key={`Annotation${id}Anchor${i}`}
          position={pos(anchor)}
          style={anchorStyle}
        />
      ))}
      {anchorPairs.map((pair) => (
        <Line
          position={[pos(pair[0]), pos(pair[1])]}
          key={`Annotation${id}Line`}
        />
      ))}
    </Group>
  );
};

Annotation.propTypes = {
  data: PropTypes.object,
  canvasSize: PropTypes.object,
  currentView: PropTypes.string,
};

export default Annotation;
