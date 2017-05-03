import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} type={type} />
    <div>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const BasicsForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="itemization" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderField} label="Name" />
      <Field name="category" type="text" component={renderField} label="Category" />
      <Field name="identifier" type="text" component={renderField} label="Identifier" />
      <footer className="p2 center">
        <button className="btn" type="submit" disabled={submitting}>Submit</button>
      </footer>
    </form>
  );
};

BasicsForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
};

export default reduxForm({
  form: 'basicsForm',  // a unique identifier for this form
})(BasicsForm);
