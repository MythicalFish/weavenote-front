import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import InputRow from 'components/FormField';

const OrgInfo = (props) => {
  const { handleSubmit, onSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        component={InputRow}
        label="Name"
        theme="alt1"
        onBlur={onSubmit}
      />
      <button type="submit" disabled={submitting} className="conceal" />
    </form>
  );
};

OrgInfo.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({ form: 'OrgInfo' })(OrgInfo);
