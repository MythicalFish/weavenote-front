
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';
import { updateComponent } from '../../actions';
import { selectComponent } from '../../selectors';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="item">
    <label>{label}</label>
    <input {...input} type={type} />
    <div>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

let Form = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="itemization" onSubmit={handleSubmit}>
      <Field name="quantity" type="text" component={renderField} label="Quantity" />
      <footer className="p2 center">
        <button className="btn-color2x" type="submit" disabled={submitting}>Submit</button>
      </footer>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
};

Form = reduxForm({
  form: 'Component',
})(Form);

export function mapDispatch(dispatch) {
  return {
    onSubmit: (data) => {
      dispatch(updateComponent(data));
    },
  };
}

Form = connect(null, mapDispatch)(Form);

export default Form;
