import BaseService from "../BaseService";

class CustomerService extends BaseService {
    async getAll() {
        return await this.get('/customers');
    }
    async create(data: object) {
        return await this.post('/customers', data);
    }
    async update(id: number, data: object) {
        return await this.put(`/customers/${id}`, data);
    }
    async deleteCustomer(id: number) {
        return await this.delete(`/customers/${id}`);
    }
}
export default new CustomerService();