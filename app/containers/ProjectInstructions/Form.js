import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import InputRow from 'components/FormInputRow';
import Button from 'components/Button';
import ImageThumbnails from 'containers/ImageThumbnails';
import ImageUploader from 'containers/ImageUploader';

const Form = (props) => {
  const { handleSubmit, submitting, initialValues: instruction, label } = props;
  const iProps = {
    maxImages: 3,
    imageable: {
      type: 'Instruction',
      id: instruction.get('id'),
    },
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="data-rows">
        <Field
          name="title"
          type="text"
          component={InputRow}
          label="Title"
          focus
        />
        <Field
          name="description"
          type="textarea"
          component={InputRow}
          label="Description"
        />
        {instruction.get('id') &&
          <div>
            <div className="actions">
              <ImageUploader {...iProps} label="Add image" />
            </div>
            <ImageThumbnails
              images={instruction.get('images')}
              {...iProps}
              deletable
            />
          </div>}
        <footer className="p2 center">
          <Button
            type="submit"
            disabled={submitting}
            label={label || 'Save instruction'}
          />
        </footer>
      </div>
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  label: PropTypes.string,
};

export default reduxForm({
  form: 'Instructions',
})(Form);
