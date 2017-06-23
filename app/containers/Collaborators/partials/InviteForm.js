import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Input from 'components/Input';
import Button from 'components/Button';

const InviteForm = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <Field type="email" name="email" component={Input} required sm placeholder="Email" />
        </div>
        <div className="col-xs-12 col-sm-6">
          <Field type="text" name="name" component={Input} sm placeholder="Name (optional)" />
        </div>
      </div>
      <footer className="flex justify-between pt2">
        <div>
          <label>Invite as guest?</label>
          <Field type="checkbox" name="as_guest" component={Input} />
        </div>
        <Button type="submit" icon="envelope-o" label="Send invite" disabled={submitting} />
      </footer>
    </form>
  );
};

InviteForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'InviteForm',
})(InviteForm);
