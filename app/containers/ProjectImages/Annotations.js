import React, { PropTypes } from 'react';
import Canvas from 'components/Canvas';
import Anchor from 'components/CanvasAnchor';
import Line from 'components/CanvasLine';

class Annotations extends React.Component {
  key = (annotation, index) =>
    `Annotation${annotation.get('id') || 'New'}Anchor${index}`;
  render() {
    const { annotation } = this.props;
    if (!annotation.get('type')) return null;
    return (
      <Canvas onClick={this.props.setAnnotation}>
        {annotation
          .get('anchors')
          .map((anchor, index) =>
            <Anchor
              {...{ anchor, ...this.props }}
              key={this.key(annotation, index)}
            />
          )}
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
