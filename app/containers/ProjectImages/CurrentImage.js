import React, { PropTypes } from 'react';
import Image from 'components/Image';
import Canvas from 'components/Canvas';
import Dot from 'components/CanvasDot';

class CurrentImage extends React.Component {
  onClickCanvas = (e) => {
    this.props.setAnnotation({ x: e.evt.offsetX, y: e.evt.offsetY });
  };
  render() {
    const { currentImage, annotation } = this.props;
    const src = currentImage.getIn(['urls', 'medium']);
    let position;
    if (annotation && annotation.get('position')) {
      position = annotation.get('position');
    }
    return (
      <div className="canvas-container">
        <Image {...{ src }} />
        {annotation &&
          <Canvas onClick={this.onClickCanvas}>
            {position && <Dot {...{ position }} />}
          </Canvas>}
      </div>
    );
  }
}

CurrentImage.propTypes = {
  currentImage: PropTypes.object,
  annotation: PropTypes.object,
  setAnnotation: PropTypes.func,
};

export default CurrentImage;
