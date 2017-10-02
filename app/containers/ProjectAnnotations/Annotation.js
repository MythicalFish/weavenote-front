import React, { PropTypes } from 'react';
import { Group } from 'react-konva';
import { idToIndex } from 'utils/reducerHelpers';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition, getPosition } from './utils';

const Annotation = (props) => {
  const {
    annotation,
    currentView: view,
    canvasSize,
    user,
    focusAnnotation,
    focusedAnnotation,
    setAnchor,
    isAnnotating,
    updateAnnotation,
    showMenu,
    hideMenu,
  } = props;
  const { id, type, annotatable } = annotation.toJS();
  console.log(annotation.toJS());
  const anchors = annotation.get('anchors');
  const isNew = !id;
  const isOwnAnnotation = user.get('id') === annotation.get('user_id');
  const isFocused = focusedAnnotation.id === id;
  const aProps = {
    isNew,
    isFocused,
    anchorStyle: type === 'dot' ? 'default' : 'lineCap',
    draggable: isNew || isOwnAnnotation,
    isVisible:
      (view === 'Measurements' && type === 'line') ||
      (view !== 'Measurements' && type !== 'line'),
    onMouseDown: (e) => {
      if (isNew || isAnnotating) return;
      focusAnnotation({ id, annotatable });
      // if (annotation.getIn(['annotatable', 'type']) === 'Comment') {
      //  focusComment(annotatable.get('id'));
      // } else {
      //  focusComment(null);
      // }
      if (isOwnAnnotation) {
        showMenu({ x: e.offsetX, y: e.offsetY });
      } else {
        hideMenu();
      }
    },
  };
  const onDragEnd = (anchor) => ({ evt: e }) => {
    const newPos = getPosition(e, canvasSize);
    if (isNew) {
      setAnchor(newPos);
    } else {
      const id = anchor.get('id');
      const anchorIndex = idToIndex(id, anchors);
      updateAnnotation(
        annotation.setIn(['anchors', anchorIndex], { id, ...newPos }).toJS()
      );
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
  annotation: PropTypes.object,
  canvasSize: PropTypes.object,
  currentView: PropTypes.string,
  focusAnnotation: PropTypes.func,
  updateAnnotation: PropTypes.func,
  showMenu: PropTypes.func,
  hideMenu: PropTypes.func,
  setAnchor: PropTypes.func,
  focusedAnnotation: PropTypes.object,
  isAnnotating: PropTypes.bool,
};

export default Annotation;
