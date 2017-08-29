import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';
import Input from 'components/FormInput';
import Image from 'components/Image';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Focusable from 'utils/Focusable';
import { updateImage, deleteImage, makePrimary } from './actions';

const ImageFormWrapper = (props) => {
  const { initialValues, focusThis, isFocused } = props;
  const src = initialValues.getIn(['urls', 'medium']);
  return (
    <div className="image-form-wrapper">
      <Image {...{ src }} />
      {isFocused && <ImageForm {...props} />}
      {!isFocused && <Icon onClick={focusThis} name="Edit" className="dark6" />}
    </div>
  );
};

const ImageForm = (props) => {
  const { handleSubmit, imageable, initialValues, unfocusThis } = props;
  const id = initialValues.get('id');
  const onSubmit = (image) => {
    props.updateImage({ imageable, image });
    unfocusThis();
  };
  const src = initialValues.getIn(['urls', 'medium']);
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
            component={Input}
            label="Name"
            placeholder="Untitled image"
            fieldClass="input-inline bigger1 center py2"
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
              const image = { id };
              props.deleteImage({ imageable, image });
              unfocusThis();
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
  imageable: PropTypes.object,
  initialValues: PropTypes.object,
  updateImage: PropTypes.func,
  deleteImage: PropTypes.func,
  makePrimary: PropTypes.func,
  unfocusThis: PropTypes.func,
};

ImageFormWrapper.propTypes = {
  initialValues: PropTypes.object,
  focusThis: PropTypes.func,
  isFocused: PropTypes.bool,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { updateImage, deleteImage, makePrimary },
    dispatch
  );
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(
  reduxForm({
    form: 'ImageForm',
  })(Focusable(ImageFormWrapper))
);
