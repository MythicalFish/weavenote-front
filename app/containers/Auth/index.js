import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as authUtils from 'utils/authUtils';
import AuthService from './AuthService';
import { fetchUser } from './actions';
import * as selectors from './selectors';

class Auth extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (!authUtils.loggedIn()) {
      const Auth0 = new AuthService();
      Auth0.lock.show();
    } else {
      this.props.fetchUser();
    }
  }
  loginForm = () => (
    <div className="flex items-middle vh-ymin100 bg-gray-darker">
      <div>
        <div className="larger light8 center mb2">
          Seamless
        </div>
        <div id="login-form"></div>
        <style>{`
          .auth0-lock-header {
            display: none;
          }
          .auth0-lock.auth0-lock.auth0-lock-opened-in-frame {
            border-radius: 6px;
            overflow: hidden;
          }
          .auth0-label-submit {
            font-weight: bold;
          }
        `}</style>
      </div>
    </div>
  )

  render() {
    const { user } = this.props;
    if (authUtils.loggedIn() && user) {
      return this.props.children;
    }
    return this.loginForm();
  }
}

Auth.propTypes = {
  children: React.PropTypes.node,
  fetchUser: React.PropTypes.func,
  user: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchUser },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
});

export default connect(mapState, mapDispatch)(Auth);
