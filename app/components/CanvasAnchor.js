import React from 'react';
import { Circle } from 'react-konva';

const themes = {
  default: {
    width: 22,
    height: 22,
    fill: '#CCC',
    strokeWidth: 3,
    stroke: '#FFF',
  },
  lineCap: {
    width: 8,
    height: 8,
    fill: '#42EA83',
    strokeWidth: 0,
  },
};

const activeColor = '#51b2fe';

const Anchor = (props) => {
  const { onMouseOut, onMouseOver, onMouseUp } = props;
  const theme = props.theme || 'default';
  const style = { ...themes[theme] };
  if (props.isActive) style.fill = activeColor;
  const handleMouseOver = (e) => {
    if (onMouseOver) onMouseOver(e.evt);
  };
  const handleMouseOut = (e) => {
    if (onMouseOut) onMouseOut(e.evt);
  };
  const handleMouseUp = (e) => {
    if (onMouseUp) onMouseUp(e.evt);
  };
  return (
    <Circle
      {...{
        ...style,
        ...props.position,
        draggable: props.isDraggable,
        onDragEnd: props.onDragEnd,
        onDragStart: props.onDragStart,
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
        onMouseUp: handleMouseUp,
      }}
    />
  );
};

Anchor.propTypes = {
  theme: React.PropTypes.string,
  isDraggable: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
  position: React.PropTypes.object,
  onMouseUp: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
  onDragStart: React.PropTypes.func,
  onMouseOver: React.PropTypes.func,
  onMouseOut: React.PropTypes.func,
};

export default Anchor;
