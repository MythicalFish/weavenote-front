import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from './jwtHelper';

const LOCK_OPTIONS = {
  container: 'login-form',
  theme: {
    logo: 'https://mythical.fish/images/logo.svg',
  },
  auth: {
    redirectUrl: window.location.origin,
    responseType: 'token',
    params: {
      scope: 'openid email',
    },
  },
};

// TODO: use dotenv for these vars
const CLIENT_ID = '2j5Y7oyQLUAQtcCAeqxbrdrFrWT3gO19';
const DOMAIN = 'mythic.eu.auth0.com';

export default class AuthService extends EventEmitter {

  constructor() {
    super();
    this.lock = new Auth0Lock(CLIENT_ID, DOMAIN, LOCK_OPTIONS);
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

  loggedIn() {
    const token = this.get('id_token');
    return !!token && !isTokenExpired(token);
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.emit('profile_updated', profile);
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    window.location.replace('/');
  }

}
