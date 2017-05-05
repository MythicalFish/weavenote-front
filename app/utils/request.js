import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(opts) {
  return fetch(requestURL(opts), requestOptions())
    .then(checkStatus)
    .then(parseJSON);
}

export function patch(opts = { path: '/', body: {} }) {
  return fetch(requestURL(opts), requestOptions({ method: 'PATCH', body: JSON.stringify(opts.body) }))
    .then(checkStatus)
    .then(parseJSON);
}

export function send(opts = { path: '/', body: {} }) {
  return fetch(requestURL(opts), requestOptions({ method: 'POST', body: JSON.stringify(opts.body) }))
    .then(checkStatus)
    .then(parseJSON);
}

export function del(opts = { path: '/', body: {} }) {
  return fetch(requestURL(opts), requestOptions({ method: 'DELETE', body: JSON.stringify(opts.body) }))
    .then(checkStatus)
    .then(parseJSON);
}

const requestURL = (opts) => {
  let url = `${process.env.API_URL}/${opts.path}`;
  if (opts.params) {
    url = `${url}?${encodedRequestParams(opts.params)}`;
  }
  return url;
};

const requestOptions = (options = {}) => {
  const o = options;
  o.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: accessToken(),
  };
  return o;
};

const encodedRequestParams = (params) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
};

export const accessToken = () => `Bearer: ${localStorage.access_token}`;
