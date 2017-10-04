import React from 'react';
import { Circle } from 'react-konva';
import { toggleState } from 'utils/misc';

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

class Anchor extends React.PureComponent {
  state = { isHovering: false };
  theme = this.props.theme || 'default';

  style = () => {
    const { isFocused, isNew, parentIsHovering } = this.props;
    const s = { ...themes[this.theme] };
    if (parentIsHovering || isNew) s.fill = activeColor;
    if (isFocused) {
      s.fill = activeColor;
    }
    return s;
  };
  mouseOver = ({ evt }) => {
    toggleState(this, 'isHovering');
    const { onMouseOver } = this.props;
    if (onMouseOver) onMouseOver(evt);
  };
  mouseOut = ({ evt }) => {
    toggleState(this, 'isHovering');
    const { onMouseOut } = this.props;
    if (onMouseOut) onMouseOut(evt);
  };
  mouseUp = ({ evt }) => {
    const { onMouseUp } = this.props;
    if (onMouseUp) onMouseUp(evt);
  };
  render() {
    const {
      position,
      isDraggable: draggable,
      onDragEnd,
      onDragStart,
    } = this.props;
    return (
      <Circle
        {...{
          ...this.style(),
          ...position,
          draggable,
          onDragEnd,
          onDragStart,
          onMouseOver: this.mouseOver,
          onMouseOut: this.mouseOut,
          onMouseUp: this.mouseUp,
        }}
      />
    );
  }
}

Anchor.propTypes = {
  theme: React.PropTypes.string,
  isDraggable: React.PropTypes.bool,
  isFocused: React.PropTypes.bool,
  isNew: React.PropTypes.bool,
  parentIsHovering: React.PropTypes.bool,
  position: React.PropTypes.object,
  onMouseUp: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
  onDragStart: React.PropTypes.func,
  onMouseOver: React.PropTypes.func,
  onMouseOut: React.PropTypes.func,
};

export default Anchor;
