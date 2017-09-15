import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';
import FocusableField from 'components/FormField';
import Image from 'components/Image';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Focusable from 'utils/Focusable';
import confirm from 'utils/confirm';
import { updateImage, deleteImage } from './actions';

const ImageFormWrapper = (props) => {
  const { focusThis, isFocused, initialValues, formHidden, theme } = props;
  const themeClass = theme ? `theme-${theme}` : '';
  return (
    <div className={`image-form-wrapper ${themeClass}`}>
      <Image src={initialValues.getIn(['urls', 'medium'])} />
      {isFocused && <ImageForm {...props} />}
      {!isFocused &&
      !formHidden && (
        <div className="image-overlay">
          <div className="image-actions">
            <Icon onClick={focusThis} name="Edit" size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

const ImageForm = (props) => {
  const { handleSubmit, initialValues, unfocusThis } = props;
  const imageable = initialValues.get('imageable_info').toJS();
  const id = initialValues.get('id');
  const onSubmit = (image) => {
    props.updateImage({ imageable, image });
    unfocusThis();
  };
  return (
    <form
      className="image-form flex items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Icon name="X" className="image-form-close" onClick={unfocusThis} />
      <div className="flex-none">
        <div className="mb3">
          <Field
            name="name"
            type="text"
            component={FocusableField}
            label="Name"
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
              confirm(
                'Are you sure you want to delete this image?'
              ).then(() => {
                const image = { id };
                props.deleteImage({ imageable, image });
                unfocusThis();
              });
            }}
          />
          <Button
            inlineIcon="star-o"
            label="Set as primary"
            inline
            small
            onClick={() => {
              const image = { id, primary: true };
              props.updateImage({ imageable, image });
              unfocusThis();
            }}
          />
        </div>
      </div>
    </form>
  );
};

ImageForm.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  updateImage: PropTypes.func,
  deleteImage: PropTypes.func,
  unfocusThis: PropTypes.func,
};

ImageFormWrapper.propTypes = {
  initialValues: PropTypes.object,
  focusThis: PropTypes.func,
  isFocused: PropTypes.bool,
  formHidden: PropTypes.bool,
  theme: PropTypes.string,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ updateImage, deleteImage }, dispatch);
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(
  reduxForm({
    form: 'ImageForm',
  })(Focusable(ImageFormWrapper))
);
