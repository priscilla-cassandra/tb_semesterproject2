const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function apiClient(endpoint, options = {}) {
  const { body, ...customOptions } = options; //Separates body from ...customOptions to check if a body exists (this decides the HTTP method), keeping customOptions separate

  const apiKey = localStorage.getItem('apiKey');
  const accessToken = localStorage.getItem('accessToken');

  const headers = {
    'content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY, //default
  };

  if (apiKey) {
    headers['X-Noroff-API-Key'] = apiKey; //override default with the users own key
  }

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`; //If user is logged in, attach accessToken to the headers
  }

  const config = {
    method: body ? 'POST' : 'GET', //If there is a body, it's a POST request, if not it's a GET request
    ...customOptions, //customOptions will override the default method
    headers: {
      //spread default headers first, then custom headers so that the custom overrides the default
      ...headers,
      ...customOptions.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(BASE_URL + endpoint, config); //The actual network call
    if (!response.ok) {
      let message = 'An API error occured'; //fallback, in case nothing else works
      try {
        const errorData = await response.json();
        message = errorData.errors?.[0]?.message || message;
      } catch {
        message = response.statusText || message;
      }
      throw new Error(message);
    }

    if (response.status === 204) {
      //204 No Content (common for succesfull DELETE)
      return null;
    }

    return await response.json(); //If there is a body, parse it as JSON and return it to whoever called the API client
  } catch (error) {
    console.error('API Client Error', error);
    throw error;
  }
}

export const get = (endpoint) => apiClient(endpoint);
export const post = (endpoint, body) => apiClient(endpoint, { body });
export const put = (endpoint, body) =>
  apiClient(endpoint, { method: 'PUT', body });
export const del = (endpoint) => apiClient(endpoint, { method: 'DELETE' });
