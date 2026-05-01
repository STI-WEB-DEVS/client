import { BaseService } from '~/api/BaseService';

export interface LoginResponse {
  token: string;
  role?: string;
  uuid?: string;
  user?: {
    uuid?: string;
    role?: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  status: number;
  message?: string;
}

export class AuthService extends BaseService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const baseURL = this.getApiBaseUrl();
      console.log('[AuthService.login] baseURL:', baseURL);
      const response = await $fetch<LoginResponse>('/login', {
        baseURL,
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: {
          email,
          password,
        },
      });

      console.log('[AuthService.login] response:', JSON.stringify(response));

      // Persist token, role, and uuid to localStorage
      this.persistTokenFromResponse(response);
      console.log('[AuthService.login] localStorage after persist:', {
        token: localStorage.getItem('_token'),
        role: localStorage.getItem('_role'),
        uuid: localStorage.getItem('_uuid')
      });

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

  async logout(): Promise<LogoutResponse> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('_token') || '' : '';

    try {
      const baseURL = this.getApiBaseUrl();
      const response = await $fetch.raw('/logout', {
        baseURL,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      return {
        success: response.status >= 200 && response.status < 300,
        status: response.status,
        message: (response._data as any)?.message,
      };
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

export const authService = new AuthService();
