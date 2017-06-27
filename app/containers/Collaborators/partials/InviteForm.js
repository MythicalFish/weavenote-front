import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Input from 'components/Input';
import Button from 'components/Button';
import { sendInvite } from '../actions';

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
          <Field type="checkbox" name="as_guest" component={Input} />
          <label className="ml1">Invite as guest?</label>
        </div>
        <div>
          <Button type="submit" icon="envelope-o" label="Send invite" disabled={submitting} sm />
        </div>
      </footer>
    </form>
  );
};

InviteForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

const mapDispatch = (dispatch) => ({
  onSubmit(data) {
    const { name, email, as_guest, invitable } = data.toJS();
    const invite = { name, email, as_guest };
    dispatch(sendInvite({ invitable, invite }));
  },
});

export default connect(null, mapDispatch)(reduxForm({
  form: 'InviteForm',
})(InviteForm));
