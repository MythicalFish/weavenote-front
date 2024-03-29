import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Input from 'components/FormField';
import Button from 'components/Button';
import { updateImage } from './actions';
import DeleteButton from './DeleteButton';

const ImageForm = (props) => {
  const { handleSubmit, initialValues, altTheme, readOnly } = props;
  const imageable = initialValues.get('imageable_info').toJS();
  const id = initialValues.get('id');
  const onSubmit = (image) => {
    props.updateImage({ imageable, image });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        type="text"
        label={!altTheme ? 'Name' : null}
        placeholder="Untitled image"
        fieldClass="center"
        focus
        readOnly={readOnly}
        onBlur={(d, name) => {
          const image = { id, name };
          props.updateImage({ imageable, image });
        }}
      />
      {!altTheme &&
        !readOnly && (
          <div className="image-form-actions center mt3">
            <DeleteButton
              image={initialValues}
              attributes={{
                fontIcon: 'trash-o',
                label: 'Delete',
                inline: true,
                small: true,
              }}
            />
            <Button
              fontIcon="far fastar"
              label="Set as primary"
              inline
              small
              onClick={() => {
                const image = { id, primary: true };
                props.updateImage({ imageable, image });
              }}
            />
          </div>
        )}
    </form>
  );
};

ImageForm.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  updateImage: PropTypes.func,
  altTheme: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ updateImage }, dispatch);
}

export default connect(null, mapDispatch)(
  reduxForm({
    form: 'ImageForm',
  })(ImageForm)
);
