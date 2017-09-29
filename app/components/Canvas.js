import React, { PropTypes } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

class Canvas extends React.PureComponent {
  state = { cursor: 'default' };
  style = () => {
    const s = {};
    if (this.props.onClick) {
      s.cursor = 'crosshair';
    } else {
      s.cursor = this.state.cursor;
    }
    return { style: s };
  };
  render() {
    const { size, onClick } = this.props;
    delete size.position;
    const Overlay = () => <Rect {...size} onClick={onClick} />;
    return (
      <div className="canvas" {...this.style()}>
        <Stage {...size}>
          <Layer>
            <Overlay />
            {this.props.children}
          </Layer>
        </Stage>
      </div>
    );
  }
}

Canvas.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  size: PropTypes.object,
};

export default Canvas;
