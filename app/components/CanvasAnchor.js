import React from 'react';
import { Group, Circle, Rect, Text } from 'react-konva';
import { toggleState } from 'utils/misc';

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

const hiddenStyle = {
  opacity: 0,
  height: 0,
  width: 0,
};

const activeColor = '#51b2fe';

class Anchor extends React.PureComponent {
  state = { action: null };
  styleName = this.props.anchorStyle || 'default';

  style = () => {
    const { isFocused, isVisible, isNew } = this.props;
    if (!isVisible) return hiddenStyle;
    const { isHovering } = this.state;
    const s = { ...styles[this.styleName] };
    if (isHovering || isNew) s.fill = activeColor;
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
  mouseUp = ({ evt }) => this.props.onMouseUp(evt);
  render() {
    const { position, draggable, onDragEnd, onDragStart } = this.props;
    return (
      <Group
        {...{
          ...position,
          draggable,
          onDragEnd,
          onDragStart,
          onMouseOver: this.mouseOver,
          onMouseOut: this.mouseOut,
          onMouseUp: this.mouseUp,
        }}
      >
        <Circle {...this.style()} />
      </Group>
    );
  }
}

Anchor.propTypes = {
  anchorStyle: React.PropTypes.string,
  draggable: React.PropTypes.bool,
  isVisible: React.PropTypes.bool,
  isFocused: React.PropTypes.bool,
  isNew: React.PropTypes.bool,
  position: React.PropTypes.object,
  onMouseUp: React.PropTypes.func,
  onDragEnd: React.PropTypes.func,
  onDragStart: React.PropTypes.func,
  onMouseOver: React.PropTypes.func,
  onMouseOut: React.PropTypes.func,
};

export default Anchor;
