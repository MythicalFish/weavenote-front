import React, { PropTypes } from 'react';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition } from 'utils/anchorPosition';

class Annotations extends React.PureComponent {
  anchorIsActive = (annotation) => {
    const { currentComment: c } = this.props;
    if (!c) return false;
    const a = annotation.get('annotatable').toJS();
    return a.type === 'Comment' && a.id === c;
  };
  isEditing = (annotation) => {
    const { newAnnotation } = this.props;
    const { annotatable: a } = annotation.toJS();
    const { annotatable: n } = newAnnotation.toJS();
    return n && a.type === n.type && a.id === n.id;
  };
  render() {
    const { canvasSize, currentImage } = this.props;
    const anchorLayer = [];
    const lineLayer = [];
    currentImage.get('annotations').forEach((annotation, index) => {
      if (this.isEditing(annotation)) return;
      const id = annotation.get('id');
      const anchors = annotation.get('anchors');
      anchors.forEach((anchor, i) => {
        anchorLayer.push(
          <Anchor
            key={`Annotation${id}Anchor${i}`}
            position={pixelPosition(anchor.toJS(), canvasSize)}
            active={this.anchorIsActive(annotation)}
          />
        );
      });
      if (anchors.size > 1) {
        lineLayer.push(
          <Line
            {...{ anchors, canvasSize, key: `Annotation${id}Line${index}` }}
          />
        );
      }
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
  currentComment: PropTypes.number,
  currentImage: PropTypes.object,
  canvasSize: PropTypes.object,
  newAnnotation: PropTypes.object,
};

export default Annotations;
