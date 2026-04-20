export interface LoginResponse {
  token: string;
}

export class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const runtimeConfig = useRuntimeConfig();

    try {
      return await $fetch<LoginResponse>('/login', {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: {
          email,
          password,
        },
      });
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
          throw new Error(message || 'Validation or Request Error');
        case 500:
          throw new Error('Server error. Please try again or contact the administrator.');
        default:
          throw new Error(message || 'Something went wrong. Please try again.');
      }
    }
  }

  // Inside your AuthService class
async logout(): Promise<void> {
  const runtimeConfig = useRuntimeConfig();
  
  // 1. Kunin ang token mula sa storage (siguraduhin na 'token' ang key na ginamit mo)
  const token = localStorage.getItem('_token'); 

  try {
    // 2. Tawagin ang backend API
    await $fetch('/logout', {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });
    console.log('Successfully deleted from database');
  } catch (error) {
    console.error('Database deletion failed:', error);
  } finally {
    // 3. Kahit anong mangyari, burahin ang token sa browser 
    // para hindi na maka-access ang user sa UI.
    localStorage.removeItem('_token');
  }
}

  
}