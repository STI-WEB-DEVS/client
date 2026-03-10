export class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(endpoint: string): Promise<T> {
    const fullUrl = this.baseUrl + endpoint;

    return await $fetch<T>(fullUrl, {
      onResponseError({ response }) {
        console.error(`[API Error ${response.status}]:`, response._data?.message || 'Unknown Error');
      }
    });
  }
} 