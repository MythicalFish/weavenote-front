import React, { PropTypes } from 'react';
import Image from 'components/Image';

class CurrentImage extends React.PureComponent {
  render() {
    const { currentImage, annotation, setAnnotation } = this.props;
    const iProps = {
      src: currentImage.getIn(['urls', 'medium']),
    };
    if (annotation) {
      iProps.className = annotation ? 'cursor-crosshair' : '';
      iProps.onClick = (c) => {
        const e = c.nativeEvent;
        setAnnotation({ x: e.offsetX, y: e.offsetY });
      };
    }
    return (
      <div>
        <Image {...iProps} />
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
