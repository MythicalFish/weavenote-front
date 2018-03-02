import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Auth0Lock from 'auth0-lock';
import { loggedIn } from 'utils/authUtils';
import Layout from 'components/Layout';
import Logo from 'images/logo.png';

export default class LoginForm extends React.PureComponent {
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
  };

  lock = (opts) => {
    const clientID =
      process.env.NODE_ENV === 'production'
        ? process.env.AUTH0_CLIENT_ID_PROD
        : process.env.AUTH0_CLIENT_ID_DEV;
    return new Auth0Lock(clientID, process.env.AUTH0_DOMAIN, opts);
  };

  initializeLock = () => {
    const opts = this.lockOptions;
    opts.allowSignUp = this.props.enableSignup;
    const { invite } = this.props;
    if (invite) {
      opts.prefill.email = invite.email;
    }
    const lock = this.lock(opts);
    lock.on('authenticated', (r) => {
      localStorage.setItem('id_token', r.idToken);
      localStorage.setItem('access_token', r.accessToken);
      this.props.fetchUser();
      const redirPath = localStorage.getItem('redirect');
      localStorage.removeItem('redirect');
      browserHistory.push(redirPath);
    });
    lock.on('authorization_error', (e) => {
      console.error('Auth error', e);
    });
    lock.on('hash_parsed', (hash) => {
      if (!hash && !loggedIn()) {
        localStorage.setItem('redirect', window.location.pathname);
        // <!-- Don't render lock while it's still parsing the tokens given in the URL
        lock.show();
      }
    });
  };

  render = () => (
    <Layout type="boxed" background="gray-lightest">
      <div className="center">
        <img src={Logo} role="presentation" />
        <div id="login-form" />
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
    </Layout>
  );
}

LoginForm.propTypes = {
  invite: PropTypes.object,
  fetchUser: PropTypes.func,
  enableSignup: PropTypes.bool,
};
