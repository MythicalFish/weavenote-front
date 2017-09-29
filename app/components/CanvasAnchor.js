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
  width: 100,
  height: 30,
  x: -50,
  y: 10,
};

const activeColor = '#51b2fe';

class Anchor extends React.PureComponent {
  state = { action: null };
  styleName = this.props.anchorStyle || 'default';

  circleStyle = () => {
    const { isFocused, isVisible, isEditable, isNew } = this.props;
    const { isHovering } = this.state;
    const s = { ...circleStyles[this.styleName] };
    if (isHovering || isNew) s.fill = activeColor;
    if (!isVisible) s.opacity = 0;
    if (isFocused) {
      s.cursor = 'default';
      s.fill = activeColor;
      if (isEditable) s.cursor = 'move';
    }
    return s;
  };
  menuStyle = () => {
    const s = { ...menuStyle };
    if (!this.state.isHovering) {
      s.opacity = 0;
      s.height = 0;
      s.width = 0;
    }
    return s;
  };
  hover = () => {
    if (this.props.isEditable) toggleState(this, 'isHovering');
  };
  click = () => {
    this.props.onClick();
    toggleState(this, 'active');
  };
  render() {
    const { position, isEditable, onClick, onDragEnd } = this.props;
    return (
      <Group
        {...{
          ...position,
          draggable: isEditable,
          onMouseOver: this.hover,
          onMouseOut: this.hover,
          onMouseDown: onClick,
          onDragEnd,
        }}
      >
        <Circle {...this.circleStyle()} />
        <Rect {...this.menuStyle()}>
          <Text text="asd" />
        </Rect>
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
  onClick: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
};

export default Anchor;
