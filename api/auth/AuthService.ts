export interface LoginResponse {
  token: string;
}

/**
 * Export both a named class and a default export so consumers can import either:
 *  - `import AuthService from '~/api/auth/AuthService'`
 *  - `import { AuthService } from '~/api/auth/AuthService'`
 */
export class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const runtimeConfig = useRuntimeConfig();

    try {
      return await $fetch<LoginResponse>('/login', {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: {
          email,
          password,
        },
      });
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

  async logout(): Promise<void> {
    const runtimeConfig = useRuntimeConfig();

    // localStorage is only available on the client
    let token: string | null = null;
    if (process.client) {
      token = localStorage.getItem('_token');
    }

    try {
      await $fetch('/logout', {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    } catch (error: any) {
      // Even if the server request fails, we still want to clear local storage
      console.error('Logout server request failed:', error);
    } finally {
      if (process.client) {
        localStorage.removeItem('_token');
      }
    }
  }
}

export default AuthService;
