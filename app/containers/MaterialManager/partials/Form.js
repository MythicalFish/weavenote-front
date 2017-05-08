import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import FormField from 'components/FormField';

let Form = (props) => {
  const { handleSubmit, submitting, materialTypes } = props;
  return (
    <form className="bg-white itemization" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={FormField} label="Name" />
      <Field name="type" type="select" component={FormField} label="Type" data={materialTypes} />
      <footer className="p2 center">
        <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
      </footer>
    </form>
  );
};

Form.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  materialTypes: PropTypes.array,
};

Form = reduxForm({
  form: 'Material',
})(Form);

export default Form;
