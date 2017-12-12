import React, { PropTypes } from 'react';
import { Circle } from 'react-konva';
import { dotTheme } from './utils';

const Anchor = (props) => {
  const { handleMouseOut, handleMouseOver, handleMouseUp, type } = props;
  const style = dotTheme(props);
  if (!props.isNew && type === 'arrow') style.opacity = 0;
  const onMouseOver = (e) => {
    if (handleMouseOver) handleMouseOver(e.evt);
  };
  const onMouseOut = (e) => {
    if (handleMouseOut) handleMouseOut(e.evt);
  };
  const onMouseUp = (e) => {
    if (handleMouseUp) handleMouseUp(e.evt);
  };
  return (
    <Circle
      {...{
        ...style,
        ...props.position,
        draggable: props.isDraggable,
        onDragEnd: props.handleDragEnd,
        onDragStart: props.handleDragStart,
        onMouseOver,
        onMouseOut,
        onMouseUp,
      }}
    />
  );
};

Anchor.propTypes = {
  type: PropTypes.string,
  isNew: PropTypes.bool,
  isDraggable: PropTypes.bool,
  isActive: PropTypes.bool,
  position: PropTypes.object,
  handleDragEnd: PropTypes.func,
  handleDragStart: PropTypes.func,
  handleMouseUp: PropTypes.func,
  handleMouseOver: PropTypes.func,
  handleMouseOut: PropTypes.func,
};

export default Anchor;
