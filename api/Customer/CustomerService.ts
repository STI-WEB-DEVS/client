import { BaseService } from "../BaseService"; 
export class CustomerService extends BaseService {
  async getCustomers() {
    // Fetch all customers
    return this.request('/customers', 'GET');
  }

  async createCustomer(customerData: object) {
    // Create a new customer
    return this.request('/customers', 'POST', customerData);
  }
}