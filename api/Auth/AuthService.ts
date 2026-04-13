import { BaseService } from "../BaseService";

export class AuthService extends BaseService {
  async login(email: string, password: string) {
    return this.request('/login', 'POST', { email, password });
  }
}