import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Input from 'components/FormInput';
import Button from 'components/Button';
import InviteInfo from './InviteInfo';
import { sendInvite } from '../actions';

const InviteForm = (props) => {
  const { handleSubmit, submitting, initialValues, roleTypes } = props;
  const type = initialValues.getIn(['invitable', 'type']);
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <Input type="email" name="email" required sm placeholder="Email" />
        </div>
        <div className="col-xs-12 col-sm-6">
          <Input type="text" name="name" sm placeholder="Name (optional)" />
        </div>
      </div>
      <footer className="flex justify-between pt2">
        {type === 'Project' && (
          <div className="flex-auto">
            <Input type="checkbox" name="as_guest" />
            <label className="ml1">Invite as guest?</label>
          </div>
        )}
        <InviteInfo type={type} />
        <div>
          <Button
            type="submit"
            inlineIcon="envelope-o"
            label="Send invite"
            disabled={submitting}
            small
          />
        </div>
      </footer>
    </form>
  );
};

InviteForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  initialValues: PropTypes.object,
};

const mapDispatch = (dispatch) => ({
  onSubmit(data) {
    const { name, email, as_guest, invitable } = data.toJS();
    const invite = { name, email, as_guest };
    dispatch(sendInvite({ invitable, invite }));
  },
});

export default connect(null, mapDispatch)(
  reduxForm({
    form: 'InviteForm',
  })(InviteForm)
);
