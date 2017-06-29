import Auth0Lock from 'auth0-lock';

export default class AuthService {

  constructor(options) {
    this.lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, options);
    this.lock.on('authorization_error', this.err.bind(this));
  }

  err = (error) => console.error('Authentication Error', error); // eslint-disable-line no-console

}
