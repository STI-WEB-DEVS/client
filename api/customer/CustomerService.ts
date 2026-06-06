import BaseService from '~/api/BaseService';

class CustomerService extends BaseService {
  private static instance: CustomerService;

  public static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService();
    }

    return CustomerService.instance;
  }

  private resource = '/customers';

  async list(params: object = {}): Promise<any> {
    return await this.request(this.resource, 'GET', params);
  }

  async create(payload: object): Promise<any> {
    return await this.request(this.resource, 'POST', payload);
  }
}

export const customerService = CustomerService.getInstance();
