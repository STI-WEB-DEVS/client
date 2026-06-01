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
      const status = error?.response?.status || error?.status;
      const responseData = error?.response?._data || error?.data || {};
      const message = responseData?.message 
        || error?.response?._data?.error
        || error?.data?.error
        || error?.message;
      
      console.error('API Error:', { status, message, error });
      
      // Create error object with data property to pass through custom error codes
      const apiError: any = new Error(message || "Something went wrong.");
      apiError.data = responseData;
      apiError.status = status;
      
      throw apiError;
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