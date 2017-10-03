import React, { PropTypes } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

export function withCanvas(Component) {
  // HOC for providing the ref to children
  class C extends React.PureComponent {
    handleRef = (ref) => (this.canvasRef = ref);
    render() {
      return (
        <CanvasContainer {...this.props} ref={this.handleRef}>
          <Component {...this.props} canvasRef={this.canvasRef} />
        </CanvasContainer>
      );
    }
  }
  return C;
}

class CanvasContainer extends React.PureComponent {
  state = { cursor: 'default' };
  render() {
    const style = { cursor: this.state.cursor };
    if (this.props.onClick) style.cursor = 'crosshair';
    const { canvasSize, onClick } = this.props;
    delete canvasSize.position;
    return (
      <div className="canvas" style={style}>
        <Stage {...canvasSize}>
          {this.props.children}
          {onClick && (
            <Layer>
              <Rect {...canvasSize} onClick={onClick} />
            </Layer>
          )}
        </Stage>
      </div>
    );
  }
}

CanvasContainer.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  canvasSize: PropTypes.object,
};
