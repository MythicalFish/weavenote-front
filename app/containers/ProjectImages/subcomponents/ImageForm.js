import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import ImageForm from 'containers/ImageForm';

const Form = (props) => {
  const { unfocusThis, doNothing } = props;
  return (
    <div className="overlay image-form flex-centered">
      <Icon
        name="X"
        className="image-form-close"
        onClick={() => {
          doNothing();
          unfocusThis();
        }}
      />
      <div className="flex-none">
        <ImageForm {...props} enableReinitialize />
      </div>
    </div>
  );
};

Form.propTypes = {
  unfocusThis: PropTypes.func,
  doNothing: PropTypes.func,
};

export default Form;
