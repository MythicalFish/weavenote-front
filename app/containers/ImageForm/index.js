import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import FocusableField from 'components/FormField';
import Button from 'components/Button';
import confirm from 'utils/confirm';
import { updateImage, deleteImage } from './actions';

const ImageForm = (props) => {
  const { handleSubmit, initialValues, altTheme } = props;
  const imageable = initialValues.get('imageable_info').toJS();
  const id = initialValues.get('id');
  const onSubmit = (image) => {
    props.updateImage({ imageable, image });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb3">
        <Field
          name="name"
          type="text"
          component={FocusableField}
          label={!altTheme ? 'Name' : null}
          placeholder="Untitled image"
          fieldClass="center"
          focus
          onBlur={(d, name) => {
            const image = { id, name };
            props.updateImage({ imageable, image });
          }}
        />
      </div>
      <div className="image-form-actions center">
        <Button
          inlineIcon="trash-o"
          label="Delete"
          inline
          small
          onClick={() => {
            confirm('Are you sure you want to delete this image?').then(() => {
              const image = { id };
              props.deleteImage({ imageable, image });
            });
          }}
        />
        {!altTheme && (
          <Button
            inlineIcon="star-o"
            label="Set as primary"
            inline
            small
            onClick={() => {
              const image = { id, primary: true };
              props.updateImage({ imageable, image });
            }}
          />
        )}
      </div>
    </form>
  );
};

ImageForm.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  updateImage: PropTypes.func,
  deleteImage: PropTypes.func,
  altTheme: PropTypes.bool,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ updateImage, deleteImage }, dispatch);
}

export default connect(null, mapDispatch)(
  reduxForm({
    form: 'ImageForm',
  })(ImageForm)
);
