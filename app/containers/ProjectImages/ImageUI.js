import React, { PropTypes } from 'react';
import sizeMe from 'react-sizeme';
import Focusable from 'utils/Focusable';
import Image from 'components/Image';
import ImageForm from './ImageForm';
import ImageActions from './ImageActions';
import NewAnnotation from './NewAnnotation';
import Annotations from './Annotations';

function ImageUI(props) {
  const { image: initialValues, newAnnotation, isFocused } = props;
  const formIsHidden = !!newAnnotation.get('type');
  const aProps = { ...props, canvasSize: props.size };
  return (
    <div className="canvas-container">
      <div className="hoverable">
        <Image src={initialValues.getIn(['urls', 'medium'])} />
        {!isFocused && !formIsHidden && <ImageActions {...props} />}
      </div>
      {isFocused && <ImageForm {...{ initialValues, ...props }} />}
      {formIsHidden && <Annotations {...aProps} />}
      {formIsHidden && <NewAnnotation {...aProps} />}
    </div>
  );
}

ImageUI.propTypes = {
  image: PropTypes.object,
  newAnnotation: PropTypes.object,
  size: PropTypes.object,
  isFocused: PropTypes.bool,
};

export default sizeMe({ monitorHeight: true })(Focusable(ImageUI));
