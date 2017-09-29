import React, { PropTypes } from 'react';
import sizeMe from 'react-sizeme';
import Focusable from 'utils/Focusable';
import ProjectAnnotations from 'containers/ProjectAnnotations';
import Image from 'components/Image';
import ImageForm from './ImageForm';
import ImageActions from './ImageActions';

function ImageUI(props) {
  const { image, isAnnotating, isFocused, size: canvasSize } = props;
  const aProps = { imageID: image.get('id'), canvasSize, isAnnotating };
  return (
    <div className="canvas-container hoverable">
      <Image src={image.getIn(['urls', 'medium'])} />
      <ProjectAnnotations {...aProps} />
      {!isAnnotating && <ImageActions {...props} />}
      {isFocused && <ImageForm {...{ initialValues: image, ...props }} />}
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
