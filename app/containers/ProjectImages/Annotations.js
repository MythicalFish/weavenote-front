import React, { PropTypes } from 'react';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition } from 'utils/anchorPosition';

class Annotations extends React.PureComponent {
  render() {
    const { canvasSize, currentImage } = this.props;
    const anchorLayer = [];
    const lineLayer = [];
    currentImage.get('annotations').forEach((annotation, index) => {
      const id = annotation.get('id');
      const anchors = annotation.get('anchors');
      if (anchors.size === 2) {
        lineLayer.push(
          <Line
            {...{ anchors, canvasSize, key: `Annotation${id}Line${index}` }}
          />
        );
      }
      anchors.forEach((anchor, i) => {
        anchorLayer.push(
          <Anchor
            key={`Annotation${id}Anchor${i}`}
            position={pixelPosition(anchor.toJS(), canvasSize)}
          />
        );
      });
    });
    return (
      <Canvas size={canvasSize}>
        {lineLayer}
        {anchorLayer}
      </Canvas>
    );
  }
}

Annotations.propTypes = {
  currentImage: PropTypes.object,
  canvasSize: PropTypes.object,
};

export default Annotations;
