import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';
import Glyph from 'components/Glyph';
import Input from 'components/Input';
import { deleteImage, updateImage } from './actions';

const ImageForm = (props) => {
  const { handleSubmit, currentImage, imageable } = props;
  const id = currentImage.get('id');
  const onSubmit = (image) => {
    props.updateImage({ imageable, image });
  };
  return (
    <form className="row" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-xs-10 flex items-end">
        <div className="mxn1 pb1">
          <Field
            name="name"
            type="text"
            component={Input}
            label="Name"
            placeholder="Untitled image"
            fieldClass="input-inline"
            onBlur={(d, name) => {
              const image = { id, name };
              props.updateImage({ imageable, image });
            }}
          />
        </div>
      </div>
      <div className="col-xs-2">
        <Glyph
          icon="trash-o"
          onClick={() => {
            props.deleteImage({ imageable, image: { id } });
          }}
        />
      </div>
    </form>
  );
};

ImageForm.propTypes = {
  handleSubmit: PropTypes.func,
  imageable: PropTypes.object,
  currentImage: PropTypes.object,
  deleteImage: PropTypes.func,
  updateImage: PropTypes.func,
};

export function mapDispatch(dispatch) {
  const boundActions = bindActionCreators(
    { updateImage, deleteImage },
    dispatch
  );
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
