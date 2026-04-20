export class BaseService {
  protected tokenStorageKey = '_token';

  private getApiBaseUrl(): string {
    if (typeof window !== 'undefined') {
      const config = (window as any).__NUXT__?.config?.public;
      if (config?.apiBaseURL) {
        return config.apiBaseURL;
      }
    }
    
    return 'http://127.0.0.1:8000/api';
  }

  private readToken(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(this.tokenStorageKey) || '';
  }

  protected clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenStorageKey);
    }
  }

  private persistTokenFromResponse(response: any) {
    if (typeof window === 'undefined' || !response || typeof response !== 'object') return;

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

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const baseURL = this.getApiBaseUrl();
    const config: RequestInit = {
      method,
      headers,
    };

    let requestUrl = `${baseURL}${url}`;
    if (method.toUpperCase() === 'GET') {
      const query = new URLSearchParams(params as Record<string, string>).toString();
      if (query) {
        requestUrl += `${url.includes('?') ? '&' : '?'}${query}`;
      }
    } else {
      headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(params);
    }

    try {
      const res = await fetch(requestUrl, config);
      const response = (await res.json()) as T;

      if (!res.ok) {
        throw {
          response: {
            status: res.status,
            _data: response,
          },
        };
      }

      this.persistTokenFromResponse(response);
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
