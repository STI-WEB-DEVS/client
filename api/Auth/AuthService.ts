import { BaseService } from "../BaseService";

export class AuthService extends BaseService {
  async login(email: string, password: string) {
    const response = await this.request<{ token: string }>("/login", "POST", { email, password });

    // Save token to localStorage
    if (response.token) {
      localStorage.setItem("loginToken", response.token);
    }

    return response;
  }

  logout() {
    // Remove token from localStorage
    localStorage.removeItem("loginToken");
  }
}