export class BaseService {
  protected async request<T>(endpoint: string, method: string = 'GET', body?: any): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
 
    const token = typeof window !== 'undefined' ? localStorage.getItem('_token') : null;
 
    try {
      return await $fetch<T>(endpoint, {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: method as any,
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body,
      });
    } catch (error: any) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }
}