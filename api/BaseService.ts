export class BaseService {
  async request<T>(url: string, method: string, params: object = {}): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
    let config: any = {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: method,
      headers: {
        Accept: 'application/json',
        
      },
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
        case 500:
          throw new Error("Server error. Please try again or contact the administrator.");
        default:
          throw new Error("Something went wrong. Please try again.");
      }
    }
  }
}

export default BaseService;