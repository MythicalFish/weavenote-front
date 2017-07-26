import React, { PropTypes } from 'react';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';
import { pixelPosition, relativePosition } from 'utils/anchorPosition';

class Annotations extends React.PureComponent {
  setAnnotation = ({ evt }) => {
    const { setAnnotation, size } = this.props;
    const pos = { x: evt.offsetX, y: evt.offsetY };
    setAnnotation(relativePosition(pos, size));
  };
  key = (annotation, index) =>
    `Annotation${annotation.get('id') || 'New'}Anchor${index}`;
  render() {
    const { annotation, size } = this.props;
    if (!annotation.get('type')) return null;
    const anchors = annotation.get('anchors');
    return (
      <Canvas onClick={this.setAnnotation} size={size}>
        {anchors.size === 2 && <Line {...{ anchors }} />}
        {anchors.map((anchor, index) =>
          <Anchor
            key={this.key(annotation, index)}
            position={pixelPosition(anchor, size)}
            onDragEnd={this.setAnnotation}
          />
        )}
      </Canvas>
    );
  }
}

Annotations.propTypes = {
  size: PropTypes.object,
  annotation: PropTypes.object,
  setAnnotation: PropTypes.func,
};

export default Annotations;
