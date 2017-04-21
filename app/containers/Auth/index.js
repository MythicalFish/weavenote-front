import React from 'react';
import AuthService from './AuthService';
export const Auth0 = new AuthService();

export default class Auth extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (!Auth0.loggedIn()) {
      Auth0.lock.show();
    }
  }
  componentWillReceiveProps() {
    if (Auth0.loggedIn()) {
      /*
       * TODO!
       * This is a horrible hacky fix to hide the form after login,
       * it wouldn't occur if handled authentication with redux-saga, etc.
       */
      document.getElementsByClassName('auth0-lock')[0].remove();
    }
  }
  render() {
    let ui;
    if (!Auth0.loggedIn()) {
      ui = (
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
    } else {
      ui = (<div>{this.props.children}</div>);
    }
    return ui;
  }
}

Auth.propTypes = {
  children: React.PropTypes.node,
};

