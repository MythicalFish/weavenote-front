import React from 'react';
import { Group, Circle } from 'react-konva';
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

const activeColor = '#51b2fe';

class Anchor extends React.PureComponent {
  state = { action: null };
  styleName = this.props.anchorStyle || 'default';

  style = () => {
    const s = { ...styles[this.styleName] };
    if (this.state.hovering) s.fill = activeColor;
    if (this.props.isFocused) s.fill = activeColor;
    if (!this.props.isVisible) s.opacity = 0;
    return s;
  };
  hover = () => {
    if (this.props.isEditable) toggleState(this, 'hovering');
  };
  click = () => {
    this.props.onClick();
    toggleState(this, 'active');
  };
  render() {
    const { position, isEditable, onClick } = this.props;
    return (
      <Group {...position}>
        <Circle
          {...{
            draggable: isEditable,
            ...this.style(),
            onMouseOver: this.hover,
            onMouseOut: this.hover,
            onMouseDown: onClick,
          }}
        />
      </Group>
    );
  }
}

Anchor.propTypes = {
  anchorStyle: React.PropTypes.string,
  isEditable: React.PropTypes.bool,
  isVisible: React.PropTypes.bool,
  isFocused: React.PropTypes.bool,
  position: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

export default Anchor;
