import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Input from 'components/Input';
import Button from 'components/Button';

const InviteForm = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <label>Email</label>
          <Field type="email" name="email" component={Input} required />
        </div>
        <div className="col-xs-12 col-md-6">
          <label>Name (optional)</label>
          <Field type="text" name="name" component={Input} />
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
