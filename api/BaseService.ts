export class BaseService {
  async request<T>(
    url: string,
    method: string,
    params: object = {},
  ): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
    const token = localStorage.getItem("_token");

    const headers: Record<string, string> = {
      Accept: "application/json",
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
      return await $fetch<T>(url, config);
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?._data?.message || error?.data?.message || error?.message;
      
      switch (status) {
        case 400: case 401: case 404: case 422: case 429:
          throw new Error(message || "Validation or Request Error");
        case 500:
          throw new Error("Server error. Please try again.");
        default:
          throw new Error(message || "Something went wrong.");
      }
    }
  }


  async get<T>(url: string, params: object = {}): Promise<T> {
    return this.request<T>(url, "GET", params);
  }

  async post<T>(url: string, data: object = {}): Promise<T> {
    return this.request<T>(url, "POST", data);
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, "DELETE");
  }
  
  async put<T>(url: string, data: object = {}): Promise<T> {
    return this.request<T>(url, "PUT", data);
  }
}

export default BaseService;