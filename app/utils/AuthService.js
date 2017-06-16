import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';

const LOCK_OPTIONS = {
  container: 'login-form',
  theme: {},
  auth: {
    redirectUrl: window.location.origin,
    responseType: 'token',
    params: {
      scope: 'openid email',
    },
  },
};

export default class AuthService extends EventEmitter {

  constructor() {
    super();
    this.lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, LOCK_OPTIONS);
    this.lock.on('authenticated', this.doAuthentication.bind(this));
    this.lock.on('authorization_error', this.err.bind(this));
  }

  doAuthentication(authResult) {
    this.set('id_token', authResult.idToken);
    this.set('access_token', authResult.accessToken);
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.error('Error loading the Profile', error); // eslint-disable-line no-console
      } else {
        this.setProfile(profile);
      }
    });
  }

  err = (error) => console.error('Authentication Error', error); // eslint-disable-line no-console
  get = (item) => localStorage.getItem(item);
  set = (item, value) => localStorage.setItem(item, value);

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.emit('profile_updated', profile);
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

}
