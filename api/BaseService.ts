export class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request(endpoint: string) {
    const fullUrl = this.baseUrl + endpoint;

    return await $fetch(fullUrl, {
      onResponseError({ response }) {
        console.error(`[API Error ${response.status}]:`, response._data?.message || 'Unknown Error');
      }
    });
  }
}