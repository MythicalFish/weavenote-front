import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition, relativePosition } from 'utils/anchorPosition';

class NewAnnotation extends React.PureComponent {
  setAnnotation = ({ evt }) => {
    const { setAnnotation, canvasSize } = this.props;
    const pos = { x: evt.offsetX, y: evt.offsetY };
    setAnnotation(relativePosition(pos, canvasSize));
  };
  createAnnotation = () => {
    const { currentImage } = this.props;
    this.props.createAnnotation(currentImage);
  };
  key = (annotation, index) => `NewAnnotationAnchor${index}`;
  render() {
    const { newAnnotation, canvasSize } = this.props;
    if (!newAnnotation.get('annotatable')) return null;
    const anchors = newAnnotation.get('anchors');
    return (
      <div>
        <Canvas onClick={this.setAnnotation} size={canvasSize}>
          {anchors.size === 2 && <Line {...{ anchors, canvasSize }} />}
          {anchors.map((anchor, index) =>
            <Anchor
              key={this.key(newAnnotation, index)}
              position={pixelPosition(anchor, canvasSize)}
              onDragEnd={this.setAnnotation}
              draggable
            />
          )}
        </Canvas>
        <div className="canvas-actions">
          <Button
            label="Cancel"
            secondary
            onClick={this.props.cancelAnnotation}
          />
          {newAnnotation.get('maxAnchors') === anchors.size &&
            <Button label="Save annotation" onClick={this.createAnnotation} />}
        </div>
      </div>
    );
  }
}

NewAnnotation.propTypes = {
  currentImage: PropTypes.object,
  canvasSize: PropTypes.object,
  newAnnotation: PropTypes.object,
  setAnnotation: PropTypes.func,
  createAnnotation: PropTypes.func,
  cancelAnnotation: PropTypes.func,
};

export default NewAnnotation;
