import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateBasics } from 'containers/ProjectManager/actions';
import { Field, reduxForm } from 'redux-form/immutable';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <input {...input} type={type} />
    <div>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

let BasicsForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="itemization" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderField} label="Name" />
      <Field name="category" type="text" component={renderField} label="Category" />
      <Field name="identifier" type="text" component={renderField} label="Identifier" />
      <footer className="p2 center">
        <button className="btn-color2x" type="submit" disabled={submitting}>Submit</button>
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

BasicsForm = reduxForm({
  form: 'basicsForm',
})(BasicsForm);

export function mapDispatch(dispatch) {
  return {
    onSubmit: (data) => {
      // this is automatically called on submit (after redux-form has done its magic)
      dispatch(updateBasics(data));
    },
  };
}

BasicsForm = connect(null, mapDispatch)(BasicsForm);

export default BasicsForm;
