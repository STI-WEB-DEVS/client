import { BaseService } from "../BaseService"; 

export class CustomerService extends BaseService {
  async getCustomers() {
    return this.request('/customers', 'GET');
  }
}