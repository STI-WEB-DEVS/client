// api/order/OrderService.ts
import BaseService from '~/api/BaseService';
 
class OrderService extends BaseService {
    private static instance: OrderService;
 
    public static getInstance(): OrderService {
        if (!OrderService.instance) {
            OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }
 
    // Maps directly to your Laravel route resource endpoint
    private resource = '/orders';
 
    async list(params: object = {}): Promise<any> {
        return await this.request(this.resource, 'GET', params);
    }
 
    // Sends checkout rows securely with your active localStorage Bearer token
    async create(payload: { customer_uuid: string; items: { product_uuid: string; quantity: number }[] }): Promise<any> {
        return await this.request(this.resource, 'POST', payload);
    }
 
    async show(uuid: string): Promise<any> {
        return await this.request(`${this.resource}/${uuid}`, 'GET');
    }
 
    async update(uuid: string, payload: object): Promise<any> {
        return await this.request(`${this.resource}/${uuid}`, 'PUT', payload);
    }
 
    async delete(uuid: string): Promise<any> {
        return await this.request(`${this.resource}/${uuid}`, 'DELETE');
    }
 
    // Custom route matching your public Laravel endpoint: /api/customers/{uuid}/orders
    async listByCustomer(customerUuid: string): Promise<any> {
        return await this.request(`/customers/${customerUuid}/orders`, 'GET');
    }
}
 
export const orderService = OrderService.getInstance();
