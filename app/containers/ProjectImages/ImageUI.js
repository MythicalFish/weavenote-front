import React, { PropTypes } from 'react';
import sizeMe from 'react-sizeme';
import Focusable from 'utils/Focusable';
import ImageAnnotations from 'containers/ImageAnnotations';
import Image from 'components/Image';
import ImageForm from './ImageForm';
import ImageActions from './ImageActions';

function ImageUI(props) {
  const { image, isDoing } = props;
  const aProps = { ...props, canvasSize: props.size };
  return (
    <div className="canvas-container hoverable">
      <Image src={image.getIn(['urls', 'medium'])} />
      <ImageAnnotations {...aProps} />
      {!isDoing('annotate') && <ImageActions {...props} />}
      {isDoing('form') && <ImageForm {...{ initialValues: image, ...props }} />}
    </div>
  );
}

ImageUI.propTypes = {
  image: PropTypes.object,
  size: PropTypes.object,
  isDoing: PropTypes.func,
};

export default sizeMe({ monitorHeight: true })(Focusable(ImageUI));
