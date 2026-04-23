import BaseService from '../BaseService'

class ProductService extends BaseService {
  constructor() {
    super('/products')
  }

  async list(params?: any) {
    return this.get('', { params })
  }

  async get(uuid: string) {
    return this.get(`/${uuid}`)
  }

  async create(data: any) {
    return this.post('', data)
  }

  async update(uuid: string, data: any) {
    return this.put(`/${uuid}`, data)
  }

  async delete(uuid: string) {
    return this.delete(`/${uuid}`)
  }
}

export default new ProductService()

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

    async delete(uuid: string): Promise<any> {
    return await this.request(`${this.resource}/${uuid}`, 'DELETE');
}

    async update(uuid: string, payload: object): Promise<any> {
    return await this.request(`${this.resource}/${uuid}`, 'PUT', payload);
}
}

export const productService = ProductService.getInstance();
