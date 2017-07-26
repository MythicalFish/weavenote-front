import React, { PropTypes } from 'react';
import TetherComponent from 'react-tether';
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
  key = (annotation, index) =>
    `Annotation${annotation.get('id') || 'New'}Anchor${index}`;
  render() {
    const { annotation, canvasSize } = this.props;
    if (!annotation.get('annotatable')) return null;
    const anchors = annotation.get('anchors');
    return (
      <TetherComponent attachment="top center" targetAttachment="bottom center">
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
        {annotation.get('maxAnchors') === anchors.size &&
          <div className="mt2 center">
            <Button label="Save annotation" onClick={() => {}} />
          </div>}
      </TetherComponent>
    );
  }
}

Annotations.propTypes = {
  canvasSize: PropTypes.object,
  annotation: PropTypes.object,
  setAnnotation: PropTypes.func,
};

export default Annotations;
