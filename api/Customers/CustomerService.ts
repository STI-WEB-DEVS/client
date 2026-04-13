import { BaseService } from "../BaseService";

// Define an interface for what a Customer looks like

export class CustomerService extends BaseService {
  async getCustomers(): Promise<any[]> {
    const response = await this.request<any>('/customers', 'GET');
    // This uses your updated BaseService which now includes the Bearer token!
    return response.data || [];
  }
}