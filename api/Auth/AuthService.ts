import { BaseService } from "../BaseService";

export class AuthService extends BaseService {
  async login(email: string, password: string) {
    // 1. Tawgon ang request method gikan sa BaseService
    const response = await this.request<{ token: string }>('/login', 'POST', { 
      email, 
      password 
    });

    // 2. I-check kung naay token nga nibalik gikan sa API
    if (response && response.token) {
      // 3. I-save sa Local Storage
      // Gigamit nato ang 'auth_token' nga key
      localStorage.setItem('auth_token', response.token);
      
      // Opsyonal: I-save pud sa Cookie para sa Nuxt SSR support
      const tokenCookie = useCookie('auth_token');
      tokenCookie.value = response.token;
    }

    return response;
  }

  // Dugang: Method para sa Logout aron malimpyo ang storage
  logout() {
    localStorage.removeItem('auth_token');
    const tokenCookie = useCookie('auth_token');
    tokenCookie.value = null;
    return navigateTo('/login');
  }
}