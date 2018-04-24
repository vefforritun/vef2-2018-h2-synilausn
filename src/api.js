const baseurl = process.env.REACT_APP_SERVICE_URL;

async function request(method, endpoint, data, file = false) {
  const url = `${baseurl}${endpoint}`;

  const options = { method, headers: {} };

  if (data && !file) {
    options.body = JSON.stringify(data);
    options.headers['content-type'] =  'application/json';
  }

  if (data && file) {
    options.body = data;
  }

  const token = window.localStorage.getItem('token');

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    console.error('Error fetching', error);
    return {
      status: 500,
      result: {
        errors: [{message: 'Villa við að sækja gögn'}]
      }
    }
  }

  if (response.status === 204) {
    return {
      status: response.status,
      result: null
    }
  }

  const result = await response.json();

  if (response.status === 401 && result.error && token) {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    window.location = '/login?tokenExpired';
    throw Error('token expired');
  }

  return {
    status: response.status,
    result
  }
}

export default {
  get: request.bind(null, 'GET'),
  post: request.bind(null, 'POST'),
  patch: request.bind(null, 'PATCH'),
  upload: request.bind(null, 'POST'),
  delete: request.bind(null, 'DELETE'),
};
