export class BaseService {
  async request<T>(url: string, method: string, params: object = {}): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
    const token = localStorage.getItem('_token');

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config: any = {
      baseURL: runtimeConfig.public.apiBaseURL,
      method,
      headers,
    };

    if (method.toUpperCase() === 'GET') {
      config.params = params;
    } else {
      config.body = params;
    }

    try {
      const response = await $fetch<T>(url, config);

      // 3. Automatically save the token if this was a login/auth request
      // Assuming your API returns the token in a field called 'token' or 'access_token'
      if ((url.includes('login') || url.includes('register')) && (response as any).token) {
        localStorage.setItem('auth_token', (response as any).token);
      }

      return response;
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        error?.response?._data?.message ||
        error?.data?.message ||
        error?.message;

      // 4. Automatically clear the key if the token is expired/unauthorized (401)
      if (status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          // Optional: redirect to login
          // window.location.href = '/login';
        }
        throw new Error("Session expired. Please login again.");
      }

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

export default BaseService;