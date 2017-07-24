import React, { PropTypes } from 'react';
import Image from 'components/Image';
import { Layer, Rect, Stage, Group } from 'react-konva';

class CurrentImage extends React.Component {
  render() {
    const { currentImage, annotation, setAnnotation } = this.props;
    const iProps = {
      src: currentImage.getIn(['urls', 'medium']),
    };
    let Dot = <Rect x={10} y={10} width={10} height={10} fill="blue" />;
    if (annotation) {
      iProps.className = annotation ? 'cursor-crosshair' : '';
      iProps.onClick = (c) => {
        const e = c.nativeEvent;
        setAnnotation({ x: e.offsetX, y: e.offsetY });
      };
      if (annotation.position) {
        const pos = annotation.position;
        Dot = <Rect x={pos.x} y={pos.y} width={10} height={10} fill="blue" />;
      }
    }
    return (
      <div className="canvas-container">
        <Image {...iProps} />
        <div className="canvas">
          <Stage>
            <Layer />
          </Stage>
        </div>
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
