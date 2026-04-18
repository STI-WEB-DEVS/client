import { BaseService } from "../BaseService"

export type Customer = {
    id: string
    name: string
    email: string
}

export class CustomerService extends BaseService {
  async getCustomers(): Promise<Customer[]> {
  return await this.request<Customer[]>('/customers', 'GET')
}
}