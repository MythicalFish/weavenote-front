import React, { PropTypes } from 'react';
import AuthService from 'utils/AuthService';

export default class LoginForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    console.log('LoginForm: mount')
    this.initializeLock();
  }

  componentDidUpdate() {
    console.log('LoginForm: update')
    const { invite } = this.props;
    if (invite) {
      this.initializeLock(invite.email);
    }
  }

  lockOptions = {
    container: 'login-form',
    theme: {},
    auth: {
      redirectUrl: window.location.origin,
      responseType: 'token',
      params: {
        scope: 'openid email',
      },
    },
    prefill: {
      email: null,
    },
  }

  initializeLock = (email) => {
    const opts = this.lockOptions;
    if (email) opts.prefill.email = email;
    const Auth0 = new AuthService(opts);
    if (email) {
      console.log('LoginForm: email present')
      setTimeout(() => {
        Auth0.lock.show();
      }, 500);
    } else {
      console.log('LoginForm: email not present')
      Auth0.lock.on('hash_parsed', (hash) => {
        if (!hash) {
          Auth0.lock.show();
        }
      });
    }
  }



  render = () => {
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

LoginForm.propTypes = {
  invite: PropTypes.object,
};
