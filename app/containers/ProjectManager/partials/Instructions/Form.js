import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';

const Form = (props) => {

  const { handleSubmit, submitting, initialValues } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" type="text" component={DataRow} label="Title" focus />
      <Field name="description" type="textarea" component={DataRow} label="Description" />
      <footer className="p2 center">
        <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
      </footer>
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'Instructions',
})(Form);
