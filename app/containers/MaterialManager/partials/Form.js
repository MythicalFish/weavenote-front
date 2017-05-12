import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DataRow from 'components/DataRow';

let Form = (props) => {
  const { handleSubmit, submitting, materialTypes, colors } = props;
  return (
    <form className="bg-white data-rows" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={DataRow} label="Name" />
      <Field name="identifier" type="text" component={DataRow} label="Identifier" />
      <Field name="type" type="select" component={DataRow} label="Type" data={materialTypes} />
      <Field name="color" type="select" component={DataRow} label="Color" data={colors} />
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
  colors: PropTypes.array,
};

Form = reduxForm({
  form: 'Material',
})(Form);

export default Form;
