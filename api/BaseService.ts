export class BaseService {
  async request<T>(url: string, method: string, params: object = {}): Promise<T> {
    // 1. Cast to any to avoid the 'Property public does not exist' error
    const runtimeConfig = useRuntimeConfig() as any;
    const token = useCookie('auth_token');
    
    // 2. Default headers
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    // 3. Only access localStorage if we are running in the browser
    if (process.client) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    let config: any = {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: method,
      headers: headers,
    };

    if (method.toUpperCase() === 'GET') {
      config.params = params;
    } else {
      config.body = params;
    }

    try {
      return await $fetch<T>(url, config);
    } catch (error: any) {
      const status = error.response?.status;
      const data = error.response?._data;

      switch (status) {
        case 400:
        case 404:
        case 422:
        case 429:
          throw new Error(data?.message || "Validation or Request Error");
        case 401:
          // Optional: handle unauthorized (e.g., clear storage and redirect to login)
          throw new Error("Unauthorized. Please login again.");
        case 500:
          throw new Error("Server error. Please try again or contact the administrator.");
        default:
          throw new Error("Something went wrong. Please try again.");
      }
    }
  }
}

export default BaseService;