import React from 'react';
import { loggedIn } from 'utils/authUtils';

export default class Auth extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  LOCK_OPTIONS = {
    container: 'login-form',
    theme: {},
    auth: {
      redirectUrl: window.location.origin,
      responseType: 'token',
      params: {
        scope: 'openid email',
      },
    },
  }

  componentDidMount() {
    var addScript = document.createElement('script');
    addScript.setAttribute('src', 'https://cdn.auth0.com/js/lock/10.13.0/lock.min.js');
    document.body.appendChild(addScript);
    setTimeout(() => {
      var lock = new Auth0Lock(
        process.env.AUTH0_CLIENT_ID,
        process.env.AUTH0_DOMAIN,
        this.LOCK_OPTIONS
      );
console.log(lock)
      lock.on("authenticated", function (authResult) {
        lock.getUserInfo(authResult.accessToken, function (error, profile) {
          if (error) {
            console.error('Authentication Error', error);
            return;
          }

          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('profile', JSON.stringify(profile));
        });
      });
    }, 1000);
  }

  createLock = () => (
    // Included externally and initialized with inline ES5 to avoid having to bundle auth0-lock as well
    <script>
      {`
        var lock = new Auth0Lock(
          "${process.env.AUTH0_CLIENT_ID}",
          "${process.env.AUTH0_DOMAIN}",
          {
            container: 'login-form',
            theme: {},
            auth: {
              redirectUrl: window.location.origin,
              responseType: 'token',
              params: {
                scope: 'openid email',
              },
            },
          }
        );

        lock.on("authenticated", function(authResult) {
          lock.getUserInfo(authResult.accessToken, function (error, profile) {
            if (error) {
              console.error('Authentication Error', error);
              return;
            }

            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('profile', JSON.stringify(profile));
          });
        });
      `}
    </script>
  )

  render() {
    if (loggedIn()) return this.props.children;
    return (
      <div className="flex items-middle vh-ymin100 bg-gray-darker">
        <div>
          <div className="larger light8 center mb2">
            Seamless
          </div>
          <div id="login-form"></div>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  children: React.PropTypes.node,
};

