import BaseService from '~/api/BaseService';

export interface LoginResponse {
  token: string;
  uuid: string;
  role: string;
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

    localStorage.setItem('uuid', response.uuid);
    localStorage.setItem('role', response.role);

    return response;
  }

  async logout(): Promise<void> {
    await this.request('/logout', 'DELETE');
    localStorage.removeItem('uuid');
    localStorage.removeItem('role');
  }
}

export const authService = AuthService.getInstance();
