import BaseService from "~/api/BaseService";

export interface LoginResponse {
  token: string;
  user?: {
    uuid?: string;
    role?: string;
    [key: string]: any;
  };
}

export interface LogoutResponse {
  message: string;
}

class AuthService extends BaseService {
  private static instance: AuthService;
  private resource = "";

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    return await this.request<LoginResponse>(`${this.resource}/login`, "POST", {
      email,
      password,
    });
  }

  async logout(): Promise<LogoutResponse> {
    try {
      const response = await this.request<LogoutResponse>(
        `${this.resource}/logout`,
        "DELETE",
      );
      // Only clear token on successful logout response from backend
      this.clearToken();
      return response;
    } catch (error) {
      // Don't clear token if logout fails, let caller decide what to do
      throw error;
    }
  }

  // Override clearToken to also clear user data
  protected clearToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("_token");
      localStorage.removeItem("uuid");
      localStorage.removeItem("role");
    }
  }

  // Public method to manually clear token if needed
  public getTokenClearer() {
    return () => this.clearToken();
  }
}

export const authService = AuthService.getInstance();
