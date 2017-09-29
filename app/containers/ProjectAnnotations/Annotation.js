import React, { PropTypes } from 'react';
import { Group } from 'react-konva';
import { idToIndex } from 'utils/reducerHelpers';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition, relativePosition } from './utils';

const Annotation = (props) => {
  const { data, currentView: view, canvasSize, user } = props;
  const { focusComment, focusAnnotation, focusedAnnotation, setAnchor } = props;
  const { isAnnotating, updateAnnotation, deleteAnnotation } = props;
  const { id, anchors, type, annotatable } = data.toObject();
  const isNew = !id;
  const aProps = {
    isNew,
    anchorStyle: type === 'dot' ? 'default' : 'lineCap',
    isFocused: focusedAnnotation === id,
    isEditable: isNew || user.get('id') === data.get('user_id'),
    isVisible:
      (view === 'Measurements' && type === 'line') ||
      (view !== 'Measurements' && type !== 'line'),
    onClick: () => {
      if (isNew) return;
      if (!isNew && isAnnotating) return;
      focusAnnotation(id);
      if (data.getIn(['annotatable', 'type']) === 'Comment') {
        focusComment(annotatable.get('id'));
      } else {
        focusComment(null);
      }
    },
  };
  const onDragEnd = (anchor) => ({ evt: e }) => {
    const newPos = relativePosition({ x: e.offsetX, y: e.offsetY }, canvasSize);
    if (isNew) {
      setAnchor(newPos);
    } else {
      const id = anchor.get('id');
      const anchorIndex = idToIndex(id, anchors);
      const annotation = data
        .setIn(['anchors', anchorIndex], { id, ...newPos })
        .toJS();
      updateAnnotation(annotation);
    }
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
          onDragEnd={onDragEnd(anchor)}
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
  updateAnnotation: PropTypes.func,
  deleteAnnotation: PropTypes.func,
  setAnchor: PropTypes.func,
  focusedAnnotation: PropTypes.number,
  isAnnotating: PropTypes.bool,
};

export default Annotation;
