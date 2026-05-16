import BaseService from '~/api/BaseService';

export interface User {
  id: number;
  uuid: string;
  company_id: number | null;
  customer_id: number | null;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

class AuthService extends BaseService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/login', 'POST', {
      email,
      password,
    });

    // Store token, uuid, and role in localStorage
    localStorage.setItem('_token', response.token);
    localStorage.setItem('uuid', response.user.uuid);
    localStorage.setItem('role', response.user.role);
    if ((response.user as any).customer_uuid) {
      localStorage.setItem('customer_uuid', (response.user as any).customer_uuid);
    }

    return response;
  }

  async logout(): Promise<void> {
    await this.request('/logout', 'DELETE');
    localStorage.removeItem('_token');
    localStorage.removeItem('uuid');
    localStorage.removeItem('role');
  }
}

export const authService = AuthService.getInstance();
