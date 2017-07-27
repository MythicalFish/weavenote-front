import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition, relativePosition } from 'utils/anchorPosition';

class Annotations extends React.PureComponent {
  setAnnotation = ({ evt }) => {
    const { setAnnotation, canvasSize } = this.props;
    const pos = { x: evt.offsetX, y: evt.offsetY };
    setAnnotation(relativePosition(pos, canvasSize));
  };
  createAnnotation = () => {
    const { currentImage } = this.props;
    this.props.createAnnotation(currentImage);
  };
  key = (annotation, index) =>
    `Annotation${annotation.get('id') || 'New'}Anchor${index}`;
  render() {
    const { annotation, canvasSize } = this.props;
    if (!annotation.get('annotatable')) return null;
    const anchors = annotation.get('anchors');
    return (
      <div>
        <Canvas onClick={this.setAnnotation} size={canvasSize}>
          {anchors.size === 2 && <Line {...{ anchors, canvasSize }} />}
          {anchors.map((anchor, index) =>
            <Anchor
              key={this.key(annotation, index)}
              position={pixelPosition(anchor, canvasSize)}
              onDragEnd={this.setAnnotation}
            />
          )}
        </Canvas>
        <div className="canvas-actions">
          <Button
            label="Cancel"
            secondary
            onClick={this.props.cancelAnnotation}
          />
          {annotation.get('maxAnchors') === anchors.size &&
            <Button label="Save annotation" onClick={this.createAnnotation} />}
        </div>
      </div>
    );
  }
}

Annotations.propTypes = {
  currentImage: PropTypes.object,
  canvasSize: PropTypes.object,
  annotation: PropTypes.object,
  setAnnotation: PropTypes.func,
  createAnnotation: PropTypes.func,
  cancelAnnotation: PropTypes.func,
};

export default Annotations;
