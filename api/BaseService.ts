export class BaseService {
  async request<T>(url: string, method: string, params: object = {}): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
    
    // Initialize headers
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    // 1. Safe Token Access: Only access localStorage on the client side
    if (import.meta.client) {
      const token = localStorage.getItem('token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const config: any = {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: method.toUpperCase(),
      headers,
    };

    // 2. Body vs Params handling
    if (config.method === 'GET') {
      config.query = params;
    } else {
      config.body = params;
    }

    try {
      return await $fetch<T>(url, config);
    } catch (error: any) {
      // 3. Robust Error Extraction
      // Nuxt $fetch puts server responses in error.data
      const status = error?.status || error?.response?.status;
      const message = 
        error?.data?.message || 
        error?.response?._data?.message || 
        error?.message;

      console.error(`[API Error ${status}]:`, message);

      switch (status) {
        case 400:
        case 401: // Unauthorized
        case 403: // Forbidden (The error you are seeing)
        case 404:
        case 422: // Validation
          throw new Error(message || 'Request failed. Please check your permissions.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(message || 'An unexpected error occurred.');
      }
    }
  }
}

export default BaseService;