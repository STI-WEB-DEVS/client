// api/auth/AuthService.ts
import { useRuntimeConfig } from '#app'

export interface LoginResponse {
  token: string;
}

export class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const runtimeConfig = useRuntimeConfig();

    try {
      if (process.client) {
        localStorage.clear();
      }

      const response = await $fetch<LoginResponse>('/login', {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: { email, password },
      });

      if (response.token && process.client) {
        // Save only one key: "token"
        localStorage.setItem('token', response.token);
      }

    } catch (error: any) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    const runtimeConfig = useRuntimeConfig();
    const tokenValue = process.client ? localStorage.getItem('token') : null;

    try {
      if (tokenValue) {
        await $fetch('/logout', {
          baseURL: runtimeConfig.public.apiBaseURL,
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenValue}`,
          },
        });
      }
    } catch (error: any) {
      console.error('Logout failed:', error.message);
    } finally {
      if (process.client) {
        localStorage.removeItem('token');
        localStorage.clear();
        console.log('Local storage fully cleared.');
      }
    }
  }
}
