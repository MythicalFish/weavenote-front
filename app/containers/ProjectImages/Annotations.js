import React, { PropTypes } from 'react';
import Canvas from 'components/Canvas';
import Dot from 'components/CanvasDot';
import Line from 'components/CanvasLine';

class Annotations extends React.Component {
  setPosition = (e) => {
    this.props.setAnnotation({ x: e.evt.offsetX, y: e.evt.offsetY });
  };
  render() {
    const { annotation } = this.props;
    if (!annotation) return null;
    const position = annotation.get('position');
    return (
      <Canvas onClick={this.setPosition}>
        {position && <Dot {...{ position }} onDragEnd={this.setPosition} />}
        <Line />
      </Canvas>
    );
  }
}

Annotations.propTypes = {
  annotation: PropTypes.object,
  setAnnotation: PropTypes.func,
};

export default Annotations;
