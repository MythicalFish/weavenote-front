import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from './jwtHelper';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();

    // Config
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: window.location.origin,
        responseType: 'token',
      },
    });

    this.lock.on('authenticated', this.doAuthentication.bind(this));
    this.lock.on('authorization_error', this.authorizationError.bind(this));
    this.login = this.login.bind(this);

  }

  doAuthentication(authResult) {
    this.set('id_token', authResult.idToken);
    this.set('access_token', authResult.accessToken);
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        this.setProfile(profile);
      }
    });
  }

  authorizationError(error) {
    console.log('Authentication Error', error);
  }

  login = () => this.lock.show();

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
