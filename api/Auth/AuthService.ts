import { BaseService } from "../BaseService";

export class AuthService extends BaseService {
  async login(email: string, password: string) {
    const response = await this.request('/login', 'POST', { email, password });

    if (response && response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  }
}
