import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';
import { updateProject } from '../../actions';
import { selectProjectBasics } from '../../selectors';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="item">
    <label>{label}</label>
    <input {...input} type={type} />
    <div>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

let Basics = (props) => {
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

Basics.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
};

Basics = reduxForm({
  form: 'Basics',
})(Basics);

export function mapDispatch(dispatch) {
  return {
    onSubmit: (data) => {
      // this is automatically called on submit (after redux-form has done its magic)
      dispatch(updateProject(data));
    },
  };
}

const mapState = createStructuredSelector({
  initialValues: selectProjectBasics(),
});

Basics = connect(mapState, mapDispatch)(Basics);

export default Basics;
