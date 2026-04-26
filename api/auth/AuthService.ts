export interface LoginResponse {
  token: string;
  user: {
    uuid: string;
    role: string;
  };
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

  async logout(): Promise<void> {
    const runtimeConfig = useRuntimeConfig()
    const token = localStorage.getItem('_token')

    try {
      if (token) {
        await $fetch('/logout', {
          baseURL: runtimeConfig.public.apiBaseURL,
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
      }
    } catch (error) {
      console.error('Logout API failed (ignored):', error)
    } finally {
      localStorage.removeItem('_token')
    }
  }
}