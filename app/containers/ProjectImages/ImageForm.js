import React, { PropTypes } from 'react';
import Icon from 'components/Icon';
import ImageForm from 'containers/ImageForm';

const Form = (props) => {
  const { unfocusThis, doNothing, initialValues } = props;
  return (
    <div className="image-form flex items-center justify-center">
      <Icon
        name="X"
        className="image-form-close"
        onClick={() => {
          doNothing();
          unfocusThis();
        }}
      />
      <div className="flex-none">
        <ImageForm
          initialValues={initialValues}
          enableReinitialize
          imgID={initialValues.get('id')} // This is only to cause a re-render
        />
      </div>
    </div>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  unfocusThis: PropTypes.func,
  doNothing: PropTypes.func,
};

export default Form;
