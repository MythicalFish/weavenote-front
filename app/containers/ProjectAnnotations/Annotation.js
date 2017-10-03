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
    canvasRef,
  } = props;
  const { id, type } = annotation.toJS();
  const anchors = annotation.get('anchors');
  const isNew = !id;
  const isOwnAnnotation = user.get('id') === annotation.get('user_id');
  const isFocused = focusedAnnotation.get('id') === id;
  const isDraggable = (isFocused && isOwnAnnotation) || isNew;
  const aProps = {
    isNew,
    isFocused,
    anchorStyle: type === 'dot' ? 'default' : 'lineCap',
    draggable: isDraggable,
    isVisible:
      (view === 'Measurements' && type === 'line') ||
      (view !== 'Measurements' && type !== 'line'),
    onMouseDown: (e) => {
      if (isNew || isAnnotating) return;
      focusAnnotation(annotation);
      if (isOwnAnnotation) {
        showMenu({ x: e.offsetX, y: e.offsetY });
      } else {
        hideMenu();
      }
    },
    onMouseOver: () => {
      if (isDraggable) canvasRef.setState({ cursor: 'move' });
    },
    onMouseOut: () => {
      canvasRef.setState({ cursor: 'default' });
    },
  };
  const onDragEnd = (anchor) => ({ evt: e }) => {
    const newPos = getPosition(e, canvasSize);
    if (isNew) {
      setAnchor(newPos);
    } else {
      const anchorID = anchor.get('id');
      const anchorIndex = idToIndex(anchorID, anchors);
      updateAnnotation(
        annotation
          .setIn(['anchors', anchorIndex], { id: anchorID, ...newPos })
          .toJS()
      );
      showMenu({ x: e.offsetX, y: e.offsetY });
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
      {anchorPairs.map((pair, i) => (
        <Line
          key={`Annotation${id}Line${i}`}
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
  canvasRef: PropTypes.object,
};

export default Annotation;
