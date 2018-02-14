import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'components/Button';
import UserInfo from './UserInfo';
import ChangeEmail from './ChangeEmail';
import { requestPassword } from '../../actions';

class Form extends React.PureComponent {
  requestPassword;
  render() {
    const { user, dispatch } = this.props;
    return (
      <div className="box">
        {user && (
          <div>
            <h3>Profile settings</h3>
            <div className="pt3 bb2 pb3">
              <h4>General</h4>
              <UserInfo
                initialValues={user}
                onSubmit={this.props.updateUser}
                {...this.props}
              />
            </div>
            <div className="pt3 bb2 pb3">
              <h4>Change email address</h4>
              <ChangeEmail {...this.props} />
            </div>
            <div className="pt4">
              <h4>Change password</h4>
              <Button
                secondary
                onClick={dispatch(requestPassword())}
                label="Reset your password"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Form.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func,
  dispatch: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    dispatch: (fn) => () => dispatch(fn),
  };
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Form);
