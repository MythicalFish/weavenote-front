import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import Button from 'components/Button';
import ImageManager from 'containers/ImageManager';

const Form = (props) => {
  const { handleSubmit, submitting, initialValues: instruction, label } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="data-rows">
        <Field
          name="title"
          type="text"
          component={DataRow}
          label="Title"
          focus
        />
        <Field
          name="description"
          type="textarea"
          component={DataRow}
          label="Description"
        />
        {instruction.get('id') &&
          <ImageManager
            images={instruction.get('images')}
            imageable={{ type: 'Instruction', id: instruction.get('id') }}
            maxImages={5}
            type="modal"
            allowEdit
            showUploader
          />}
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
