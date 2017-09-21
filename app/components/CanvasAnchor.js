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

class Anchor extends React.PureComponent {
  state = { hovering: false, action: null };
  styleName = this.props.style || 'default';
  style = () => {
    const s = { ...styles[this.styleName] };
    if (this.styleName !== 'default') return s;
    if (this.state.hovering) s.fill = '#51b2fe';
    return s;
  };
  toggleHover = () => this.setState({ hovering: !this.state.hovering });
  render() {
    const { position, onDragEnd, draggable, active } = this.props;
    return (
      <Circle
        {...{
          x: position.x,
          y: position.y,
          draggable,
          onDragEnd,
          ...this.style(),
          onMouseOver: () => this.toggleHover(),
          onMouseOut: () => this.toggleHover(),
        }}
      />
    );
  }
}

Anchor.propTypes = {
  style: React.PropTypes.string,
  active: React.PropTypes.bool,
  draggable: React.PropTypes.bool,
  position: React.PropTypes.object,
  onDragEnd: React.PropTypes.func,
};

export default Anchor;
