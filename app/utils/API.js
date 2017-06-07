import 'whatwg-fetch';

export function request(method = 'GET', path, params) {

  let url;
  const body = requestBody();

  if (method === 'GET') {
    url = requestURL({ path, params });
  } else {
    url = requestURL({ path });
    body.method = method;
    body.body = JSON.stringify(params);
  }

  return fetch(url, body)
    .then((r) => r.json())
    .then((r) => {
      if (r.server_error) {
        return console.log(`%c ${r.server_error}`, ConsoleErrorStyle);
      }
      return r;
    });
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

function requestBody() {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken(),
    },
  };
}

const encodedRequestParams = (params) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
};

function asdasd(response) {
  console.log('asdasd');
  console.log(response);
  return response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const ConsoleErrorStyle = [
  'background: linear-gradient(#D33106, #571402)',
  'border: 1px solid #3E0E02',
  'color: white',
  'display: block',
  'padding: 20px',
  'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
  'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
  'line-height: 44px',
  'text-align: center',
  'font-weight: bold',
].join(';');
