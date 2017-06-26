import 'whatwg-fetch';

export function request(method = 'GET', path, params) {

  let url;
  const request = requestBody();

  if (method === 'GET') {
    url = requestURL({ path, params  });
  } else {
    url = requestURL({ path });
    request.method = method;
    request.body = JSON.stringify(params);
  }

  return fetch(url, request)
    .then((r) => r.json())
    .then((r) => {
      if (r.server_error) {
        console.log(`%c ${r.server_error}`, ConsoleErrorStyle);
        throw ('Hmm. Something went wrong; we\'ll look into it!');
      } else if (r.user_error) {
        throw(r.user_error);
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

export function destroy(path, params) {
  return request('DELETE', path, params);
}

export const accessToken = () => `Bearer: ${localStorage.access_token}`;

// Private

const requestURL = (opts) => {
  let url = `${process.env.API_URL}/${opts.path}`;
  if (opts.params) {
    url = `${url}?${toQueryString(opts.params)}`;
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

const toQueryString = (obj, urlEncode = false) => {
  if (!obj) return null;
  const flattenObj = (x, path = []) => {
    const result = [];
    Object.keys(x).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(x, key)) return;
      const newPath = path.slice();
      newPath.push(key);
      let vals = [];
      if (typeof x[key] === 'object') {
        vals = flattenObj(x[key], newPath);
      } else {
        vals.push({ path: newPath, val: x[key] });
      }
      vals.forEach((v) => {
        return result.push(v);
      });
    });
    return result;
  };

  let parts = flattenObj(obj);
  parts = parts.map((varInfo) => {
    if (varInfo.path.length === 1) {
      varInfo.path = varInfo.path[0]; // eslint-disable-line no-param-reassign
    } else {
      const first = varInfo.path[0];
      const rest = varInfo.path.slice(1);
      varInfo.path = `${first}[${rest.join('][')}]`; // eslint-disable-line no-param-reassign
    }
    return varInfo;
  });

  const queryString = parts.map((varInfo) => {
    return `${varInfo.path}=${varInfo.val}`;
  }).join('&');
  if (urlEncode) {
    return encodeURIComponent(queryString);
  }
  return queryString;
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const ConsoleErrorStyle = [
  'background: #111',
  'color: #51B2FE',
  'display: block',
  'line-height: 20px',
  'padding: 5px',
].join(';');
