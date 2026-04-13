export class BaseService {
  async request<T>(url: string, method: string, params: object = {}): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
    const token = localStorage.getItem('token'); // get token from local storage

    let config: any = {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: method,
      headers: {
        Accept: 'application/json',
      },
    };

    // Attach Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

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
        case 500:
          throw new Error("Server error. Please try again or contact the administrator.");
        case 401:
          throw new Error("Unauthorized. Please log in again.");
        default:
          throw new Error("Something went wrong. Please try again.");
      }
    }
  }
}

export default BaseService;
