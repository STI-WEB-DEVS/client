export class BaseService {
  async request<T>(url: string, method: string, params: object = {}): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
    const apiBase = runtimeConfig.public.apiBaseURL;

    const token = process.client ? localStorage.getItem('token') : null;

    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchOptions: any = {
      baseURL: apiBase,
      method: method.toUpperCase(),
      headers,
    };

    if (fetchOptions.method === 'GET') {
      fetchOptions.query = params; 
    } else {
      fetchOptions.body = params;
    }

    try {
      return await $fetch<T>(url, fetchOptions);
    } catch (error: any) {
      console.error(`[API Error ${method} ${url}]:`, error);
      const status = error?.response?.status;
      const data = error?.response?._data;
      const message = data?.message || error?.message || 'Unknown Error';

      switch (status) {
        case 401: throw new Error('Unauthorized: Please login again.');
        case 404: throw new Error(`Endpoint not found: ${url}`);
        case 422: return Promise.reject(data); 
        case 500: throw new Error('Server error. Please contact administrator.');
        default: throw new Error(message);
      }
    }
  }
}

export default BaseService;