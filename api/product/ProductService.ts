import BaseService from "../BaseService";

class ProductService extends BaseService {
    async getAll() {
        return await this.get('/products');
    }
    async create(data: object) {
        return await this.post('/products', data);
    }
    async update(id: number, data: object) {
        return await this.put(`/products/${id}`, data);
    }
    async deleteProduct(id: number) {
        return await this.delete(`/products/${id}`); 
    }
}

export default new ProductService();