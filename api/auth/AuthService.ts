export interface LoginResponse {
  token: string;
  user: {
    uuid: string;
    role: string; // This comes from your getRoleNames()->first() in Laravel
    name: string;
    email: string;
    customer_uuid: string;
  };
}

export class AuthService {
  // Centralized key for local storage
  private static TOKEN_KEY = '_token';

  async login(email: string, password: string): Promise<LoginResponse> {
    const runtimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<LoginResponse>('/login', {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: { email, password },
      });
      
      // Save everything to local storage here
      localStorage.setItem(AuthService.TOKEN_KEY, response.token);

      if (response.user) {
      localStorage.setItem('user_uuid', response.user.uuid);
      localStorage.setItem('user_role', response.user.role);
      localStorage.setItem('customer_uuid', response.user.customer_uuid);
    }

      return response;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async logout(): Promise<boolean> {
    const runtimeConfig = useRuntimeConfig();
    const token = localStorage.getItem(AuthService.TOKEN_KEY);

    try {
      await $fetch('/logout', {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      // Clear everything
      localStorage.removeItem(AuthService.TOKEN_KEY);
      localStorage.removeItem('user_uuid');
      localStorage.removeItem('user_role');
      localStorage.removeItem('customer_uuid');
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  }

  private handleError(error: any): never {
    const status = error?.response?.status;
    const message = error?.response?._data?.message || error?.data?.message || error?.message;

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