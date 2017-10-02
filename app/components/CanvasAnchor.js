import React from 'react';
import { Group, Circle, Rect, Text } from 'react-konva';
import { toggleState } from 'utils/misc';

const circleStyles = {
  default: {
    width: 22,
    height: 22,
    fill: '#CCC',
    strokeWidth: 3,
    stroke: '#FFF',
    cursor: 'pointer',
  },
  lineCap: {
    width: 8,
    height: 8,
    fill: '#42EA83',
    strokeWidth: 0,
  },
};

const menuStyle = {
  fill: '#FFF',
  width: 30,
  height: 30,
  x: -15,
  y: 10,
  cursor: 'pointer',
};

const hiddenStyle = {
  opacity: 0,
  height: 0,
  width: 0,
};

const activeColor = '#51b2fe';

class Anchor extends React.PureComponent {
  state = { action: null };
  styleName = this.props.anchorStyle || 'default';

  circleStyle = () => {
    const { isFocused, isVisible, isEditable, isNew } = this.props;
    if (!isVisible) return hiddenStyle;
    const { isHovering } = this.state;
    const s = { ...circleStyles[this.styleName] };
    if (isHovering || isNew) s.fill = activeColor;
    if (isFocused) {
      s.cursor = 'default';
      s.fill = activeColor;
      if (isEditable) s.cursor = 'move';
    }
    return s;
  };
  menuStyle = () => {
    if (!this.state.isHovering) return hiddenStyle;
    return menuStyle;
  };
  hover = () => {
    if (this.props.isEditable) toggleState(this, 'isHovering');
  };
  render() {
    const { position, isEditable, onFocus, onDragEnd } = this.props;
    return (
      <Group
        {...{
          ...position,
          draggable: isEditable,
          onMouseOver: this.hover,
          onMouseOut: this.hover,
          onMouseDown: onFocus,
          onDragEnd,
        }}
      >
        <Circle {...this.circleStyle()} />
        <Rect {...this.menuStyle()} />
      </Group>
    );
  }
}

Anchor.propTypes = {
  anchorStyle: React.PropTypes.string,
  isEditable: React.PropTypes.bool,
  isVisible: React.PropTypes.bool,
  isFocused: React.PropTypes.bool,
  isNew: React.PropTypes.bool,
  position: React.PropTypes.object,
  onFocus: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
};

export default Anchor;
