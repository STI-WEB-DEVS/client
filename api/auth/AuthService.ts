import BaseService from '~/api/BaseService';

export interface LoginResponse {
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
    return await this.request<LoginResponse>('/login', 'POST', {
      email,
      password,
    });
  }

  async logout(): Promise<void> {
    await this.request('/logout', 'DELETE');
  }
}

export const authService = AuthService.getInstance();

