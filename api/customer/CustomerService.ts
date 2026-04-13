import { BaseService } from '~/api/BaseService';

// Define interface para sa Type Safety (optional pero recommended)
export interface Customer {
  id: number;
  name: string;
  email: string;
  // pun-i sa uban fields base sa imong API
}

export class CustomerService extends BaseService {
  /**
   * Kuhaon ang listahan sa mga customers
   */
  async getCustomers(): Promise<Customer[]> {
    return await this.request<Customer[]>('/api/customers', 'GET');
  }

  /**
   * Kuhaon ang profile sa usa ka customer
   */
  async getCustomerById(id: string | number): Promise<Customer> {
    return await this.request<Customer>(`/api/customers/${id}`, 'GET');
  }

  /**
   * Mag-update og customer data
   */
  async updateCustomer(id: number, data: object): Promise<Customer> {
    return await this.request<Customer>(`/api/customers/${id}`, 'PUT', data);
  }
}