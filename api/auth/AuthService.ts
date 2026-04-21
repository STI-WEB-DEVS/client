export interface LoginResponse {
  token: string;
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
