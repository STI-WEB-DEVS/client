export class BaseService {
  async request<T>(url: string, method: string, params: object = {}): Promise<T> {
    const runtimeConfig = useRuntimeConfig();

    const isClient = import.meta.client;

    // Retrieve token from localStorage if available
    const token = isClient ? localStorage.getItem("authToken") : null;

    let config: any = {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: method,
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // inject token if exists
      },
    };

    if (method.toUpperCase() === "GET") {
      config.params = params;
    } else {
      config.body = params;
    }

    try {
      const response = await $fetch<T>(url, config);

      // Cast response to any to check for token/role fields
      const anyResponse = response as any;

      if (isClient) {
        // Save or update token in localStorage (supports common API shapes)
        const tokenFromResponse =
          anyResponse?.token ||
          anyResponse?.access_token ||
          anyResponse?.accessToken ||
          anyResponse?.data?.token ||
          anyResponse?.data?.access_token ||
          anyResponse?.data?.accessToken;

        if (tokenFromResponse) {
          localStorage.setItem("authToken", tokenFromResponse);
        }

        // Normalize role label to "customer" after login/response
        if (anyResponse?.role || anyResponse?.user?.role || anyResponse?.data?.role) {
          localStorage.setItem("userRole", "customer");
        }
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
