const BaseService = class {
  async request<T>(
    url: string,
    method: string,
    params: object = {},
  ): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
    const authToken = useCookie<string | null>("_token");
    const token = authToken.value || localStorage.getItem("_token");

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
      credentials: 'include',
    };

    if (method.toUpperCase() === "GET") {
      config.params = params;
    } else {
      // ensure CSRF cookie is set for Sanctum when making state-changing requests
      try {
        await $fetch('/sanctum/csrf-cookie', {
          baseURL: runtimeConfig.public.apiBaseURL,
          credentials: 'include',
          method: 'get',
        })
      } catch (e) {
        // proceed; server may not require CSRF for API token flows
      }

      headers['Content-Type'] = 'application/json'
      config.body = params;
    }

    try {
      return await $fetch<T>(url, config);
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
          throw new Error(message || "Validation or Request Error");
        case 500:
          throw new Error(
            "Server error. Please try again or contact the administrator.",
          );
        default:
          throw new Error(message || "Something went wrong. Please try again.");
      }
    }
  }
}

export default BaseService
export { BaseService }