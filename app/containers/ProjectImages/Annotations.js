import React, { PropTypes } from 'react';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import Text from 'components/CanvasText';
import { pixelPosition } from 'utils/anchorPosition';

class Annotations extends React.PureComponent {
  anchorIsActive = (annotatable) => {
    const { currentComment: c } = this.props;
    if (!c) return false;
    const { type, id } = annotatable.toJS();
    return type === 'Comment' && id === c;
  };
  isEditing = (annotation) => {
    const { newAnnotation } = this.props;
    const { annotatable: a } = annotation.toJS();
    const { annotatable: n } = newAnnotation.toJS();
    return n && a.type === n.type && a.id === n.id;
  };
  anchorStyle = (annotation) =>
    annotation.get('type') === 'dot' ? 'default' : 'lineCap';
  render() {
    const { canvasSize, currentImage } = this.props;
    const anchorLayer = [];
    const lineLayer = [];
    currentImage.get('annotations').forEach((annotation, index) => {
      const { id, anchors, annotatable } = annotation.toObject();
      if (!annotatable) return; // Sometimes undefined ??
      if (this.isEditing(annotation)) return;
      const identifier = annotatable.get('identifier');
      anchors.forEach((anchor, i) => {
        anchorLayer.push(
          <Anchor
            key={`Annotation${id}Anchor${i}`}
            position={pixelPosition(anchor.toJS(), canvasSize)}
            active={this.anchorIsActive(annotation)}
            style={this.anchorStyle(annotation)}
          />
        );
      });
      if (anchors.size > 1) {
        lineLayer.push(
          <Line
            {...{
              anchors,
              canvasSize,
              identifier,
              key: `Annotation${id}Line${index}`,
            }}
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
