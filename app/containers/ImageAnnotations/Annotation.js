import React, { PropTypes } from 'react';
import { Group } from 'react-konva';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition } from './utils';

const Annotation = (props) => {
  const { data, currentView: view, canvasSize, user } = props;
  const { focusComment, focusAnnotation, focusedAnnotation } = props;
  const { id, anchors, type, annotatable } = data.toObject();
  const aProps = {
    anchorStyle: type === 'dot' ? 'default' : 'lineCap',
    isFocused: focusedAnnotation === id,
    isEditable: user.get('id') === data.get('user_id'),
    isVisible:
      (view === 'Measurements' && type === 'line') ||
      (view !== 'Measurements' && type !== 'line'),
    onClick: () => {
      focusAnnotation(id);
      if (data.getIn(['annotatable', 'type']) === 'Comment') {
        focusComment(annotatable.get('id'));
      } else {
        focusComment(null);
      }
    },
  };
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
          {...aProps}
        />
      ))}
      {anchorPairs.map((pair) => (
        <Line
          key={`Annotation${id}Line`}
          position={[pos(pair[0]), pos(pair[1])]}
          {...aProps}
        />
      ))}
    </Group>
  );
};

Annotation.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
  canvasSize: PropTypes.object,
  currentView: PropTypes.string,
  focusComment: PropTypes.func,
  focusAnnotation: PropTypes.func,
  focusedAnnotation: PropTypes.number,
};

export default Annotation;
