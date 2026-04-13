export class BaseService {
  async request<T>(url: string, method: string, params: object = {}): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
    const token = process.client ? localStorage.getItem("token") : null;

    let config: any = {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: method,
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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
