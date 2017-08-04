import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import InputRow from 'components/FormField';
import Button from 'components/Button';

const OrganizationForm = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form className="data-rows" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={InputRow} label="Name" />
      <footer className="p2 center">
        <Button type="submit" disabled={submitting} label="Save" />
      </footer>
    </form>
  );
};

OrganizationForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({ form: 'OrganizationForm' })(OrganizationForm);
