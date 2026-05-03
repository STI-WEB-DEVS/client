export class BaseService {
  private tokenStorageKey = '_token';

  protected getApiBaseUrl(): string {
    if (typeof window !== 'undefined') {
      const config = (window as any).__NUXT__?.config?.public;
      if (config?.apiBaseURL) {
        return config.apiBaseURL;
      }
    }
    
    return 'http://127.0.0.1:8000/api';
  }

  protected readToken(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(this.tokenStorageKey) || '';
  }

  protected persistTokenFromResponse(response: any) {
    if (typeof window === 'undefined' || !response || typeof response !== 'object') return;

    // Commented out to prevent raw data flooding your console
    // console.log('[BaseService.persistTokenFromResponse] input:', JSON.stringify(response));

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

    const uuid =
      response.uuid ||
      response.data?.uuid ||
      response.user?.uuid ||
      response.user?.id ||
      response.user?.data?.uuid;

    if (typeof uuid === 'string' && uuid.trim()) {
      localStorage.setItem('_uuid', uuid);
      // console.log('[BaseService] saved _uuid:', uuid);
    }

    /**
     * Logic Fix: Only attempt to extract a role if a token or UUID is present.
     * This prevents warnings when fetching general data like product lists.
     */
    if (token || uuid) {
      let role: any;
      if (response.role != null) {
        role = response.role;
      } else if (response.data?.role != null) {
        role = response.data.role;
      } else if (response.user?.role != null) {
        role = response.user.role;
      } else if (response.data?.user?.role != null) {
        role = response.data.user.role;
      } else if (response.user?.data?.role != null) {
        role = response.user.data.role;
      }

      if (role != null) {
        localStorage.setItem('_role', String(role));
        console.log('[BaseService] saved _role:', role);
      } else {
        // This will now only warn during actual authentication attempts
        console.warn('[BaseService] could not extract role from response');
      }
    }
  }

  async request<T>(url: string, method: string, params: object = {}): Promise<T> {
    const token = this.readToken();

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    if (method.toUpperCase() !== 'GET') {
      headers['Content-Type'] = 'application/json';
    }

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

      // Automatically handle token and role persistence
      this.persistTokenFromResponse(response);
      
      return response;
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        error?.response?._data?.message ||
        error.data?.message ||
        error.message;

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