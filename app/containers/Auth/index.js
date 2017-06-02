import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as authUtils from 'utils/authUtils';
import AuthService from './AuthService';

class Auth extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (!authUtils.loggedIn()) {
      const Auth0 = new AuthService();
      Auth0.lock.show();
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
    if (authUtils.loggedIn()) {
      return this.props.children;
    }
    return this.loginForm();
  }
}

Auth.propTypes = {
  children: React.PropTypes.node,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    {},
    dispatch
  );
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Auth);
