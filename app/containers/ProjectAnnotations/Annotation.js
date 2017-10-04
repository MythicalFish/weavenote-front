import React, { PropTypes } from 'react';
import CanvasAnnotation from 'components/CanvasAnnotation';
import { pixelPosition } from 'utils/canvasPosition';
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
  const isNew = !id;
  const isOwnAnnotation = user.get('id') === annotation.get('user_id');
  const isFocused = focusedAnnotation.get('id') === id;
  const isDraggable = (isFocused && isOwnAnnotation) || isNew;
  const isVisible =
    (view === 'Measurements' && type === 'line') ||
    (view !== 'Measurements' && type !== 'line');

  const aProps = {
    isNew,
    isFocused,
    isDraggable,
    isVisible,
    type,
    canvasSize,
    anchors: annotation.get('anchors'),
    theme: type === 'dot' ? 'default' : 'lineCap',
    lineStyle: 'default',
    onMouseUp: (e) => {
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
    handleAnchorDragStart: () => {
      hideMenu();
    },
    handleAnchorDragEnd: (anchorIndex, newPosition) => {
      if (isNew) {
        setAnchor(newPosition);
      } else {
        updateAnnotation(
          annotation
            .setIn(['anchors', anchorIndex, 'x'], newPosition.x)
            .setIn(['anchors', anchorIndex, 'y'], newPosition.y)
            .toJS()
        );
        showMenu({ ...pixelPosition(newPosition, canvasSize) });
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
