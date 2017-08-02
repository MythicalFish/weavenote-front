import React from 'react';
import { Circle } from 'react-konva';

const styles = {
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

export default function Anchor(props) {
  const { position, onDragEnd, draggable, active } = props;
  const style = props.style || 'default';
  const aProps = styles[style];
  if (active && style === 'default') aProps.fill = '#51b2fe';
  return (
    <Circle
      {...{
        x: position.x,
        y: position.y,
        draggable,
        onDragEnd,
        ...aProps,
      }}
    />
  );
}

Anchor.propTypes = {
  style: React.PropTypes.string,
  active: React.PropTypes.bool,
  draggable: React.PropTypes.bool,
  position: React.PropTypes.object,
  onDragEnd: React.PropTypes.func,
};
