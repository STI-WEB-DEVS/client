export class BaseService {
  private tokenStorageKey = '_token';

  private isClient(): boolean {
    return typeof window !== 'undefined';
  }

  private get baseURL(): string {
    // Safe way to get runtime config
    if (this.isClient()) {
      return (window as any).__NUXT__?.config?.public?.apiBaseURL || '';
    }
    return '';
  }

  private getToken(): string {
    if (!this.isClient()) return '';
    return localStorage.getItem(this.tokenStorageKey) || '';
  }

  private saveToken(response: any) {
    if (!this.isClient() || !response) return;

    const token = response.token ||
                  response.access_token ||
                  response.accessToken ||
                  response.data?.token ||
                  response.data?.access_token ||
                  response.data?.accessToken;

    if (typeof token === 'string' && token.trim()) {
      localStorage.setItem(this.tokenStorageKey, token);
    }
  }

  async request<T>(
    url: string,
    method: string = 'GET',
    params: object = {}
  ): Promise<T> {
    const token = this.getToken();

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config: Record<string, any> = {
      method: method.toUpperCase(),
      headers,
    };

    if (config.method === 'GET') {
      config.params = params;
    } else {
      config.body = params;
    }

    try {
      const fullUrl = `${this.baseURL}${url}`;

      if (config.method === 'GET') {
        const query = new URLSearchParams(params as Record<string, string>).toString();
        const requestUrl = query ? `${fullUrl}?${query}` : fullUrl;
        const response = await fetch(requestUrl, config);
        const data = (await response.json()) as T;
        this.saveToken(data);
        return data;
      }

      config.body = JSON.stringify(params);
      const response = await fetch(fullUrl, config);
      const data = (await response.json()) as T;
      this.saveToken(data);
      return data;
    } catch (error: any) {
      const status = error?.response?.status;
      let message = error?.response?._data?.message ||
                    error?.data?.message ||
                    error?.message ||
                    'Something went wrong. Please try again.';

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
          throw new Error(message);
      }
    }
  }
}

export default BaseService;
