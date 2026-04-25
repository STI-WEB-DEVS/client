import { BaseService } from "../BaseService"; 

<<<<<<< HEAD
export class CustomerService extends BaseService {
  async getCustomers() {
    return this.request('/customers', 'GET');
  }

  async createCustomer(customerData: object) {
    return this.request('/customers', 'POST', customerData);
  }
  
}
=======
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

  async show(uuid: string): Promise<any> {
    return await this.request(`${this.resource}/${uuid}`, 'GET');
  }

  async update(uuid: string, payload: object): Promise<any> {
    return await this.request(`${this.resource}/${uuid}`, 'PUT', payload);
  }

  async delete(uuid: string): Promise<any> {
    return await this.request(`${this.resource}/${uuid}`, 'DELETE');
  }

  async restore(uuid: string): Promise<any> {
    return await this.request(`${this.resource}/${uuid}/restore`, 'POST');
  }
}

export const customerService = CustomerService.getInstance();
>>>>>>> 0134aa442a3ac0cc4abb1e494ff43d2e01e0b54c
