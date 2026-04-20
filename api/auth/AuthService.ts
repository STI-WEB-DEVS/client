import BaseService from '~/api/BaseService';

export interface LoginResponse {
  token: string;
}

export interface LogoutResponse {
  message: string;
}

class AuthService extends BaseService {
  private static instance: AuthService;
  private resource = '';

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    return await this.request<LoginResponse>(`${this.resource}/login`, 'POST', {
      email,
      password,
    });
  }

  async logout(): Promise<LogoutResponse> {
    const response = await this.request<LogoutResponse>(`${this.resource}/logout`, 'POST');
    this.clearToken();
    return response;
  }
}

export const authService = AuthService.getInstance();
