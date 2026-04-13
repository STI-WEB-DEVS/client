import { BaseService } from "../BaseService";

// api/Customer/CustomerService.ts

export class CustomerService extends BaseService {
    async getCustomers(): Promise<any[]> {
      const response = await this.request<any>('/customers', 'GET');
      
      // Laravel API Resources wrap the array in a 'data' key
      // We return response.data so the frontend gets the actual array
      return response.data || []; 
    }
  }