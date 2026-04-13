// ~/api/Auth/AuthService.ts
import { BaseService } from "../BaseService";

export class AuthService extends BaseService {
  async login(email: string, password: string) {
    const response = await this.request<any>('/login', 'POST', { 
      email, 
      password 
    });

    // Save token to localStorage (only on client side)
    if (process.client) {
      const token = response?.token 
                    || response?.access_token 
                    || response?.data?.token 
                    || response?.data?.access_token;

      if (token) {
        localStorage.setItem('auth_token', token);
      }
    }

    return response;
  }

  // Optional: Add logout method
  logout() {
    if (process.client) {
      localStorage.removeItem('auth_token');
    }
  }
}