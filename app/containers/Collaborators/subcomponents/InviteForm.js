import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Input from 'components/FormInput';
import Button from 'components/Button';
import { sendInvite } from '../actions';

const InviteForm = (props) => {
  const { handleSubmit, submitting, initialValues } = props;
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
        <div className="flex-auto">
          <Input type="checkbox" name="as_guest" />
          <label className="ml1">Invite as guest?</label>
          <div className="subtle mt3">
            <div className="mb1 bold">Information regarding roles:</div>
            <ul>
              <li>{"Guests can't see anything related to pricing"}</li>
              <li>{"Guests can't modify or add anything except comments"}</li>
              {type === 'Project' && (
                <li>
                  {
                    "Users invited only to this project can't see other projects"
                  }
                </li>
              )}
              {type === 'Organization' && (
                <li>
                  {'Users invited to this organization can see all projects'}
                </li>
              )}
            </ul>
          </div>
        </div>
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
