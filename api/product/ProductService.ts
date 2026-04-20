import BaseService from '~/api/BaseService';

class ProductService extends BaseService {
  private static instance: ProductService;

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }

    return ProductService.instance;
  }

  private resource = '/products';

  async list(params: object = {}): Promise<any> {
    return await this.request(this.resource, 'GET', params);
  }

  async create(payload: object): Promise<any> {
    return await this.request(this.resource, 'POST', payload);
  }

  async show(uuid: string): Promise<any> {
    return await this.request(`${this.resource}/${uuid}`, 'GET');
  }

  async update(uuid: string, payload: object): Promise<any> {
    return await this.request(`${this.resource}/${uuid}`, 'PUT', payload);
  }

  async delete(uuid: string): Promise<any> {
    return await this.request(`${this.resource}/${uuid}`, 'DELETE');
  }
}

export const productService = ProductService.getInstance();
