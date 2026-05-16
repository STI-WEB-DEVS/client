import BaseService from '~/api/BaseService';

export class AuthService extends BaseService {
  /**
   * Authenticate a user and return the token + user data.
   * Mirrors: POST /api/login → UserService::loginUser()
   */
  async login(email: string, password: string): Promise<any> {
    return await this.request('/login', 'POST', { email, password });
  }

  /**
   * Revoke the current access token from the database.
   * Mirrors: DELETE /api/logout → UserService::logoutUser()
   *
   * The backend calls $user->currentAccessToken()->delete()
   * which removes the row from the personal_access_tokens table
   * for the token that was sent in the Authorization header.
   *
   * Returns the response so the caller can check for success
   * before clearing the local token.
   */
  async logout(): Promise<any> {
    return await this.request('/logout', 'DELETE');
  }

  /**
   * Store the token in localStorage after a successful login.
   */
  setToken(token: string): void {
    localStorage.setItem('_token', token);
  }

  /**
   * Remove the token from localStorage.
   */
  clearToken(): void {
    localStorage.removeItem('_token');
  }

  /**
   * Check if a token exists in localStorage.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('_token');
  }
}

export class AuthService {
  private getToken() {
    return process.client ? localStorage.getItem("_token") : null;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const runtimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<LoginResponse>("/login", {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: {
          email,
          password,
        },
      });

      return response;
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        error?.response?._data?.message ||
        error?.data?.message ||
        error?.message;

      switch (status) {
        case 400:
        case 401:
        case 404:
        case 422:
        case 429:
          throw new Error(message || "Validation or Request Error");
        case 500:
          throw new Error("Server error. Please try again.");
        default:
          throw new Error(message || "Something went wrong.");
      }
    }
  }

  async logout(): Promise<any> {
    const runtimeConfig = useRuntimeConfig();

    const token = this.getToken();

    if (!token) {
      throw new Error("No token found");
    }

    try {
      return await $fetch("/logout", {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        error?.response?._data?.message ||
        error?.data?.message ||
        error?.message;

      if (status === 401) {
        throw new Error("Unauthenticated");
      }

      throw new Error(message || "Logout failed");
    }
  }
}

export const authService = new AuthService();