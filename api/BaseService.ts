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

    if (method.toUpperCase() === "GET") {
      config.params = params;
    } else {
      config.body = params;
    }

    try {
      const response = await $fetch<T>(url, config);

      // Only save token on client
      if (process.client && (response as any)?.token) {
        localStorage.setItem("token", (response as any).token);
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

export default BaseService;
