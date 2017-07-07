import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import Button from 'components/Button';
import ImageManager from 'containers/ImageManager';

const Form = (props) => {
  const { handleSubmit, submitting, initialValues: instruction } = props;
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
            maxImages={1}
            imageable={{ type: 'Instruction', id: instruction.get('id') }}
            currentImage={instruction.getIn(['images', 0])}
          />}
        <footer className="p2 center">
          <Button type="submit" disabled={submitting} label="Save" />
        </footer>
      </div>
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  projectID: PropTypes.number,
};

export default reduxForm({
  form: 'Instructions',
})(Form);
