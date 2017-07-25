import React, { PropTypes } from 'react';
import Image from 'components/Image';
import { Layer, Rect, Stage, Group } from 'react-konva';

class CurrentImage extends React.Component {
  render() {
    const { currentImage, annotation, setAnnotation } = this.props;
    const iProps = {
      src: currentImage.getIn(['urls', 'medium']),
    };
    const Overlay = () =>
      <Rect
        width={1000}
        height={1000}
        onClick={(e) => {
          setAnnotation({ x: e.evt.offsetX, y: e.evt.offsetY });
        }}
      />;
    let Dot = null;
    if (annotation) {
      iProps.className = annotation ? 'cursor-crosshair' : '';
      if (annotation.position) {
        const pos = annotation.position;
        Dot = () =>
          <Rect x={pos.x} y={pos.y} width={10} height={10} fill="blue" />;
      }
    }
    return (
      <div className="canvas-container">
        <Image {...iProps} />
        {annotation &&
          <div className="canvas cursor-crosshair">
            <Stage width={1000} height={1000}>
              <Layer>
                <Overlay />
                {Dot && <Dot />}
              </Layer>
            </Stage>
          </div>}
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
