import React, { PropTypes } from 'react';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
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
  anchorStyle = (type) => (type === 'dot' ? 'default' : 'lineCap');

  render() {
    const { canvasSize, image, currentView } = this.props;
    const anchorLayer = [];
    const lineLayer = [];

    image.get('annotations').forEach((annotation, index) => {
      const { id, anchors, annotatable, type } = annotation.toObject();
      if (this.isEditing(annotation)) return;
      const isActive = this.anchorIsActive(annotatable);
      if (type === 'line' && currentView !== 'Measurements') return;
      anchors.forEach((anchor, i) => {
        anchorLayer.push(
          <Anchor
            key={`Annotation${id}Anchor${i}`}
            position={pixelPosition(anchor.toJS(), canvasSize)}
            active={isActive}
            style={this.anchorStyle(type)}
          />
        );
      });
      if (anchors.size > 1) {
        lineLayer.push(
          <Line
            {...{
              anchors,
              canvasSize,
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
  image: PropTypes.object,
  canvasSize: PropTypes.object,
  newAnnotation: PropTypes.object,
  currentView: PropTypes.string,
};

export default Annotations;
