import 'whatwg-fetch';

export function request(method = 'GET', path, params) {

  let url;
  const body = requestBody;

  if (method === 'GET') {
    url = requestURL({ path, params });
  } else {
    url = requestURL({ path });
    body.method = method;
    body.body = JSON.stringify(params);
  }

  return fetch(url, body)
    .then(checkStatus)
    .then(parseJSON);
}

export function get(path, params) {
  return request('GET', path, params);
}

export function post(path, params) {
  return request('POST', path, params);
}

export function patch(path, params) {
  return request('PATCH', path, params);
}

export function destroy(path) {
  return request('DELETE', path);
}

export const accessToken = () => `Bearer: ${localStorage.access_token}`;

// Private

const requestURL = (opts) => {
  let url = `${process.env.API_URL}/${opts.path}`;
  if (opts.params) {
    url = `${url}?${encodedRequestParams(opts.params)}`;
  }
  return url;
};

const requestBody = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: accessToken(),
  },
};

const encodedRequestParams = (params) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
};

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
