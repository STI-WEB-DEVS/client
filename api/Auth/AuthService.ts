export interface LoginResponse {
  token: string;
}

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

  async logout(): Promise<boolean> {
    const runtimeConfig = useRuntimeConfig();

    try {
      const token = localStorage.getItem('_token');
      if (!token) return false;

      const response = await $fetch('/logout', {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: 'DELETE', // <--- Change this from 'POST' to 'DELETE'
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // If backend confirms deletion
      localStorage.removeItem('_token');
      return true;
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        error?.response?._data?.message ||
        error?.data?.message ||
        error?.message;

      console.error('Logout failed:', message);

      return false;
    }
  }
}
