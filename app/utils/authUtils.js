
export function loggedIn() {
  /*
   * FYI:
   * The token is actually verified on the server, so although
   * a user can enter with an invalid token, all API requests
   * will return Unauthorized in such a case.
   */
  const token = localStorage.getItem('id_token');
  return !!token;
}

export function logout() {
  localStorage.removeItem('id_token');
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');
  window.location.replace('/');
}
