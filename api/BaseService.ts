export class BaseService {
  private tokenStorageKey = 'auth_token';

  private getApiBaseUrl(): string {
    try {
      const runtimeConfig = useRuntimeConfig();
      if (runtimeConfig?.public?.apiBaseURL) {
        return runtimeConfig.public.apiBaseURL;
      }
    } catch {
      // fallback below for cases where composables are unavailable
    }

    if (import.meta.client) {
      const nuxtConfig = (window as any).__NUXT__?.config;
      return nuxtConfig?.public?.apiBaseURL || '';
    }

    return '';
  }

  private readToken(): string {
    if (!import.meta.client) return '';
    return localStorage.getItem(this.tokenStorageKey) || '';
  }

  private persistTokenFromResponse(response: any) {
    if (!import.meta.client || !response || typeof response !== 'object') return;

    const token =
      response.token ||
      response.access_token ||
      response.accessToken ||
      response.data?.token ||
      response.data?.access_token ||
      response.data?.accessToken;

    if (typeof token === 'string' && token.trim()) {
      localStorage.setItem(this.tokenStorageKey, token);
    }
  }

  async request<T>(url: string, method: string, params: object = {}): Promise<T> {
    const token = this.readToken();

    let config: any = {
      baseURL: this.getApiBaseUrl(),
      method: method,
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    if (method.toUpperCase() === 'GET') {
      config.params = params;
    } else {
      config.body = params;
    }

    try {
      const response = await $fetch<T>(url, config);
      this.persistTokenFromResponse(response);
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
