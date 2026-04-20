export interface LoginResponse {
  token: string;
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
      
      // Assuming you store it here after login
      localStorage.setItem(AuthService.TOKEN_KEY, response.token);
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

      // Clear token IF AND ONLY IF request succeeded
      localStorage.removeItem(AuthService.TOKEN_KEY);
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