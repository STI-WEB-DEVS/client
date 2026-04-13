import { BaseService } from "../BaseService"; 

export class CustomerService extends BaseService {
  async getCustomers() {
    return this.request('/customers', 'GET');
  }

  async createCustomer(customerData: object) {
    return this.request('/customers', 'POST', customerData);
  }
  
}