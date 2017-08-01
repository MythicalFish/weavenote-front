import React, { PropTypes } from 'react';
import Auth0Lock from 'auth0-lock';
import { loggedIn } from 'utils/authUtils';

export default class LoginForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.initializeLock();
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
    allowedConnections: ['Username-Password-Authentication'],
  }

  lock = (opts) => (
    new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, opts)
  )

  initializeLock = () => {
    const opts = this.lockOptions;
    const { invite } = this.props;
    if (invite) {
      opts.prefill.email = invite.email;
    }
    const lock = this.lock(opts);
    lock.on('authenticated', (r) => {
      localStorage.setItem('id_token', r.idToken);
      localStorage.setItem('access_token', r.accessToken);
      this.props.fetchUser();
    });
    lock.on('authorization_error', (e) => {
      console.error('Auth error', e);
    });
    lock.on('hash_parsed', (hash) => {
      if (!hash && !loggedIn()) { // <!-- Don't render lock while it's still parsing the tokens given in the URL
        lock.show();
      }
    });
  }

  render = () => {
    return (
      <div className="flex items-middle vh-ymin100 bg-gray-darker">
        <div>
          <div className="larger light8 center mb2">
            WeaveNote
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
  fetchUser: PropTypes.func,
};
