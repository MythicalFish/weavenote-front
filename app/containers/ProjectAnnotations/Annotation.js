import React, { PropTypes } from 'react';
import CanvasAnnotation from 'components/CanvasAnnotation';
import { getPosition, anchorPoints } from 'utils/canvasPosition';
import { idToIndex } from 'utils/reducerHelpers';

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
  const { id, type, anchors } = annotation.toObject();
  const isNew = !id;
  const isOwnAnnotation = user.get('id') === annotation.get('user_id');
  const isFocused = focusedAnnotation.get('id') === id;
  const isDraggable = (isFocused && isOwnAnnotation) || isNew;
  let isVisible = false;
  if (['line', 'arrow'].includes(type)) {
    if (view === 'Measurements') isVisible = true;
  } else if (view !== 'Measurements') {
    isVisible = true;
  }

  const aProps = {
    isDraggable,
    isVisible,
    type,
    canvasSize,
    canvasRef,
    anchors,
    isNew,
    isActive: isFocused || isNew,
    onMouseUp: ({ position }) => {
      if (isNew || isAnnotating) return;
      focusAnnotation(annotation);
      if (isOwnAnnotation) {
        showMenu(position);
      } else {
        hideMenu();
      }
    },
    handleAnchorDragStart: () => {
      hideMenu();
    },
    handleAnchorDragEnd: ({ anchor, event }) => {
      const anchorID = anchor.get('id');
      const anchorIndex = idToIndex(anchorID, anchors);
      const newPos = getPosition(event, canvasSize);
      const a = annotation
        .setIn(['anchors', anchorIndex], { id: anchorID, ...newPos })
        .toJS();
      if (isNew) {
        setAnchor(newPos);
      } else {
        updateAnnotation(a);

        showMenu({ x: event.offsetX, y: event.offsetY });
      }
    },
  };

  return <CanvasAnnotation {...aProps} />;
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
