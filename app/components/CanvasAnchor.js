import React, { PropTypes } from 'react';
import { Circle } from 'react-konva';

const themes = {
  default: {
    width: 22,
    height: 22,
    fill: '#CCC',
    strokeWidth: 3,
    stroke: '#FFF',
  },
  line: {
    width: 8,
    height: 8,
    fill: '#42EA83',
    strokeWidth: 0,
  },
  arrow: {
    width: 8,
    height: 8,
    fill: '#42EA83',
    strokeWidth: 0,
  },
};

const activeColor = '#51b2fe';

const Anchor = (props) => {
  const { handleMouseOut, handleMouseOver, handleMouseUp, type } = props;
  const theme = themes[type] ? type : 'default';
  const style = { ...themes[theme] };
  if (props.isActive) style.fill = activeColor;
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
