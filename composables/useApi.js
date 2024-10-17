import { defu } from 'defu'

const getApiBaseURL = () => {
  const config = useRuntimeConfig();
  return config.public.apiBaseUrl;
};

const getAuthToken = () => {
  const token = useCookie('token');
  return token.value;
};

const createHeaders = (existingHeaders = {}, token) => {
  const headers = { ...existingHeaders };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const fetchApi = (url, options = {}) => {
  const baseURL = getApiBaseURL();
  const token = getAuthToken();

  const headers = createHeaders(options.headers, token);

  const { data, pending, error, refresh, execute } = useFetch(url, {
    ...options,
    baseURL,
    headers
  });

  return { data, pending, error, refresh, execute };
};

export const useGetApi = (url, params = {}, options = {}) => {
  return fetchApi(url, {
    ...options,
    method: 'GET',
    params
  });
};

export const useDeleteApi = async (url, params = {}, options = {}) => {
  const { data, error, execute } = fetchApi(url, {
    ...options,
    method: 'DELETE',
    params
  });
  await execute();
  
  if (error.value) {
    throw new Error(error.value.data.message || 'Unknown error');
  }
  return data.value;
};

export const usePostApi = async (url, body = {}, options = {}) => {
  const { data, error, execute } = fetchApi(url, {
    ...options,
    method: 'POST',
    body
  });
  await execute();

  if (error.value) {
    throw new Error(error.value.data.message || 'Unknown error');
  }
  return data.value;
};

export const usePutApi = async (url, body = {}, options = {}) => {
  const { data, error, execute } = fetchApi(url, {
    ...options,
    method: 'PUT',
    body
  });
  await execute();

  if (error.value) {
    throw new Error(error.value.data.message || 'Unknown error');
  }
  return data.value;
};

export const useApi= (url, options = {}) => {
  const accessToken = useCookie('accessToken')

  const defaults = {
    baseURL: getApiBaseURL(),
    key: toValue(url),
    headers: accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {},
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}