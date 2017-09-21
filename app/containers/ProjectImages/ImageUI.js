import React, { PropTypes } from 'react';
import sizeMe from 'react-sizeme';
import Focusable from 'utils/Focusable';
import ImageAnnotations from 'containers/ImageAnnotations';
import Image from 'components/Image';
import ImageForm from './ImageForm';
import ImageActions from './ImageActions';

function ImageUI(props) {
  const { image: initialValues, isFocused, isAnnotating } = props;
  const aProps = { ...props, canvasSize: props.size };
  return (
    <div className="canvas-container hoverable">
      <Image src={initialValues.getIn(['urls', 'medium'])} />
      <ImageAnnotations {...aProps} />
      {!isFocused && !isAnnotating && <ImageActions {...props} />}
      {isFocused && <ImageForm {...{ initialValues, ...props }} />}
    </div>
  );
}

ImageUI.propTypes = {
  image: PropTypes.object,
  size: PropTypes.object,
  isFocused: PropTypes.bool,
  isAnnotating: PropTypes.bool,
};

export default sizeMe({ monitorHeight: true })(Focusable(ImageUI));
