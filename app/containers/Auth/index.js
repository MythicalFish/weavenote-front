import React from 'react';
import AuthService from 'utils/AuthService';

// TODO: use dotenv for these vars
const AUTH0_CLIENT_ID = '2j5Y7oyQLUAQtcCAeqxbrdrFrWT3gO19';
const AUTH0_DOMAIN = 'mythic.eu.auth0.com';
export const authService = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

export default class Auth extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let ui = this.props.children;
    if (!authService.loggedIn()) {
      ui = LoginUI();
    }
    return (
      <div>
        {ui}
      </div>
    );
  }
}

function LoginUI() {
  return (
    <div>
      Please login
      <br />
      <button className="" onClick={authService.login.bind(this)}>Login</button>
    </div>
  );
}

Auth.propTypes = {
  children: React.PropTypes.element.isRequired,
};
