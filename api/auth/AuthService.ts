// api/auth/AuthService.ts
import { useRuntimeConfig } from '#app'

export interface LoginResponse {
  token: string;
  uuid: string;
  role: string;
}

export class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const runtimeConfig = useRuntimeConfig();

    // ✅ Only remove auth keys, NOT everything
    if (process.client) {
      this.cleanAuthKeys();
      this.removeNuisanceKeys();   // removes nuxt-error-overlay, _VUE_DEVTOOLS_*
    }

    const response = await $fetch<LoginResponse>('/login', {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: { email, password },
    });

    if (response.token && process.client) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('uuid', response.uuid);
      localStorage.setItem('role', response.role);
    }
    return response;
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
        // Remove only auth keys and nuisance keys – keep orders
        this.cleanAuthKeys();
        this.removeNuisanceKeys();
      }
    }
  }

  // Remove only token, uuid, role – keep customer_orders
  private cleanAuthKeys() {
    localStorage.removeItem('token');
    localStorage.removeItem('uuid');
    localStorage.removeItem('role');
  }

  // Remove nuxt-error-overlay and Vue DevTools keys
  private removeNuisanceKeys() {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('nuxt-error-overlay') || key.includes('_VUE_DEVTOOLS_'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    if (keysToRemove.length) console.log(' Removed nuisance keys:', keysToRemove);
  }
}