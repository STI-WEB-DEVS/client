import BaseService from "../BaseService";

class OrderService extends BaseService {
    async createOrder(data: object) {
        return await this.post('/orders', data);
    }
    
    async getAll() {
        return await this.get('/orders');
    }
    
    async getById(id: number) {
        return await this.get(`/orders/${id}`);
    }
}

export default new OrderService();
