import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';
import Glyph from 'components/Glyph';
import Input from 'components/Input';
import { deleteImage, updateImage } from '../actions';

const ImageForm = (props) => {
  const { handleSubmit, imageable, currentImage } = props;
  const id = currentImage.get('id');
  return (
    <form className="row" onSubmit={handleSubmit}>
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
              const p = { id, name, imageable };
              props.updateImage(p);
            }}
          />
        </div>
      </div>
      <div className="col-xs-2">
        <Glyph
          icon="trash-o"
          onClick={() => {
            props.deleteImage({ imageable, id });
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
    onSubmit: (data) => {
      const { id, name, imageable } = data.toJS();
      dispatch(updateImage({ id, name, imageable }));
    },
    ...boundActions,
  };
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(
  reduxForm({
    form: 'ImageForm',
  })(ImageForm)
);
