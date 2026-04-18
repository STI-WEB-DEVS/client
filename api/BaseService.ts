// BaseService.ts
export default class BaseService {
  async request<T>(url: string, method: string, data: object = {}): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
    
    // Fix for "Object is possibly null" - localStorage.getItem can return null
    const token = localStorage.getItem('_token');

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // You named this 'config'...
    const config: any = {
      baseURL: runtimeConfig.public.apiBaseURL,
      method,
      headers,
    };

    // ...so you must use 'config' here, not 'options'
    if (method.toUpperCase() === 'GET') {
      config.params = data;
    } else {
      config.body = data;
    }

    try {
      // Pass 'config' into $fetch
      const response = await $fetch<T>(url, config);

      // Handle token storage
      if ((url.includes('login') || url.includes('register')) && (response as any).token) {
        // Fix: Use localStorage.setItem instead of token.value 
        // (token is a string from getItem, not a reactive Ref)
        localStorage.setItem('_token', (response as any).token);
      }

      return response;
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        error?.response?._data?.message ||
        error?.data?.message ||
        error?.message;

      switch (status) {
        case 400:
        case 401:
        case 404:
        case 422:
        case 429:
          throw new Error(message || 'Validation or Request Error');
        case 500:
          throw new Error('Server error. Please try again or contact the administrator.');
        default:
          throw new Error(message || 'Something went wrong. Please try again.');
      }
    }
  }
}
