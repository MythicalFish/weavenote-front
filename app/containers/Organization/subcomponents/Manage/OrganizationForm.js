import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import Button from 'components/Button';

const OrganizationForm = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form className="data-rows" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={DataRow} label="Name" />
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
