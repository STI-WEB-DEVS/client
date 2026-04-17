import { BaseService } from "../BaseService"

export type Customer = {
    id: string
    name: string
    email: string
}

export class CustomerService extends BaseService {
  async getCustomers(): Promise<Customer[]> {
    const res = await this.request<any>('/customers', 'GET')
    return res.data
}
}