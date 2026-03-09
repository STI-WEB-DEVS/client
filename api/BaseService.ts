export class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(endpoint: string, options: any = {}): Promise<T> {
    try {
      return await $fetch<T>(endpoint, {
        baseURL: this.baseUrl,
        ...options,
        onResponseError({ response }) {
          console.error(`[API Error ${response.status}]:`, response._data?.message || 'Unknown Error. Please Contact Your System Administrator.');
        }
      });
    } catch (err: any) {
      throw err;
    }
  }
}