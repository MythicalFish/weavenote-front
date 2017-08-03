import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';
import Input from 'components/Input';
import { updateImage } from './actions';

const ImageForm = (props) => {
  const { handleSubmit, imageable, initialValues } = props;
  const id = initialValues.get('id');
  const onSubmit = (image) => {
    props.updateImage({ imageable, image });
  };
  return (
    <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-none px3 pb3">
        <Field
          name="name"
          type="text"
          component={Input}
          label="Name"
          placeholder="Untitled image"
          fieldClass="input-inline bigger1 center"
          onBlur={(d, name) => {
            const image = { id, name };
            props.updateImage({ imageable, image });
          }}
        />
      </div>
    </form>
  );
};

ImageForm.propTypes = {
  handleSubmit: PropTypes.func,
  imageable: PropTypes.object,
  initialValues: PropTypes.object,
  updateImage: PropTypes.func,
};

export function mapDispatch(dispatch) {
  const boundActions = bindActionCreators({ updateImage }, dispatch);
  return {
    ...boundActions,
  };
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(
  reduxForm({
    form: 'ImageForm',
  })(ImageForm)
);
