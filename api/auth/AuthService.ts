export interface User {
  uuid:           string;
  customer_uuid?: string;
  name:           string;
  email:          string;
}

export interface LoginResponse {
  token: string;
  user:  User & { roles: string[] }; // Nesting roles inside user is cleaner
}

export class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const runtimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<LoginResponse>('/login', {
        baseURL: runtimeConfig.public.apiBaseURL,
        method:  'POST',
        headers: { Accept: 'application/json' },
        body:    { email, password },
      });

      if (import.meta.client) {
        localStorage.setItem('token',         response.token);
        localStorage.setItem('uuid',          response.user.uuid);
        localStorage.setItem('customer_uuid', response.user.customer_uuid || '');
        localStorage.setItem('roles',         JSON.stringify(response.user.roles));
        localStorage.setItem('user',          JSON.stringify(response.user));
      }

      return response;
    } catch (error: any) {
      const message = error?.response?._data?.message || error?.message;
      throw new Error(message || 'Login failed');
    }
  }

  async logout(): Promise<void> {
    if (import.meta.client) {
      const runtimeConfig = useRuntimeConfig();
      const token = this.getToken();

      try {
        if (token) {
          await $fetch('/logout', {
            baseURL: runtimeConfig.public.apiBaseURL,
            method:  'POST', 
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
        }
      } catch (error) {
        console.warn('Server logout failed:', error);
      } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('uuid');
        localStorage.removeItem('roles');
        localStorage.removeItem('user');
      }
    }
  }

  getToken(): string | null {
    return import.meta.client ? localStorage.getItem('token') : null;
  }

  getRoles(): string[] {
  if (!import.meta.client) return [];
  const roles = localStorage.getItem('roles');
  try {
    return roles ? JSON.parse(roles) : [];
  } catch (e) {
    console.error("Failed to parse roles from local storage", e);
    return [];
  }
}

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}