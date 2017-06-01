import React from 'react';
import * as authUtils from 'utils/authUtils';
import AuthService from './AuthService';

export default class Auth extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (!authUtils.loggedIn()) {
      const Auth0 = new AuthService();
      Auth0.lock.show();
    }
  }

  render() {
    if (authUtils.loggedIn()) return this.props.children;
    return (
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
    );
  }
}

Auth.propTypes = {
  children: React.PropTypes.node,
};

