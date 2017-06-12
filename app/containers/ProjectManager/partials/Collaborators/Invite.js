import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Input from 'components/Input';
import Button from 'components/Button';

const Invite = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <label>Email</label>
          <Field type="text" name="email" component={Input} />
        </div>
        <div className="col-xs-12 col-md-6">
          <label>Name (optional)</label>
          <Field type="text" name="name" component={Input} />
        </div>
      </div>
      <footer className="flex justify-between pt2">
        <Button type="submit" icon="envelope-o" label="Send invite" />
      </footer>
    </form>
  );
};

Invite.propTypes = {
  item: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'Invite',
})(Invite);
