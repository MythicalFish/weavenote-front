import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import Field from 'components/FormField';

const UserInfo = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="username"
      type="text"
      label="Username"
      onChange={props.updateUser}
      theme="alt1"
    />
    <Field
      name="name"
      type="text"
      label="Name"
      onChange={props.updateUser}
      theme="alt1"
    />
    <button type="submit" disabled={props.submitting} className="conceal" />
  </form>
);

UserInfo.propTypes = {
  handleSubmit: PropTypes.func,
  updateUser: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'UserInfo',
})(UserInfo);
