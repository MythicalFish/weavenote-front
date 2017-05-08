import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div className="item">  
      <label>{label}</label>
      <input {...input} type={type} />
    </div>
    {touched && error && <span>{error}</span>}
  </div>
);

let Form = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderField} label="Name" />
      <footer className="p2 center">
        <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
      </footer>
    </form>
  );
};

Form.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

Form = reduxForm({
  form: 'Material',
})(Form);

export default Form;
