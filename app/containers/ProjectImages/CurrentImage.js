import React, { PropTypes } from 'react';
import ImageForm from 'containers/ImageForm';
import sizeMe from 'react-sizeme';
import NewAnnotation from './NewAnnotation';
import Annotations from './Annotations';

function CurrentImage(props) {
  const { currentImage, newAnnotation } = props;
  const aProps = { ...props };
  delete aProps.size;
  aProps.canvasSize = props.size;
  return (
    <div className={'canvas-container'}>
      <ImageForm
        initialValues={currentImage}
        formIsHidden={!!newAnnotation.get('type')}
        enableReinitialize
        imgID={currentImage.get('id')} // This is only to cause a re-render
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
};

export default sizeMe({ monitorHeight: true })(CurrentImage);
