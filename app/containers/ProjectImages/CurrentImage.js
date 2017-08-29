import React, { PropTypes } from 'react';
import ImageForm from 'containers/ImageForm';
import sizeMe from 'react-sizeme';
import NewAnnotation from './NewAnnotation';
import Annotations from './Annotations';

function CurrentImage(props) {
  const { currentImage, imageable, newAnnotation } = props;
  const hideForm = !!newAnnotation.get('type');
  const aProps = { ...props };
  delete aProps.size;
  aProps.canvasSize = props.size;
  const src = currentImage.getIn(['urls', 'medium']);
  return (
    <div className={'canvas-container'}>
      <ImageForm
        initialValues={currentImage}
        {...{ imageable, src, hideForm }}
      />
      <Annotations {...aProps} />
      <NewAnnotation {...aProps} />
    </div>
  );
}

CurrentImage.propTypes = {
  currentImage: PropTypes.object,
  newAnnotation: PropTypes.object,
  size: PropTypes.object,
  imageable: PropTypes.object,
};

export default sizeMe({ monitorHeight: true })(CurrentImage);
