import BaseService from '~/api/BaseService';

class OrderService extends BaseService {
    private static instance: OrderService;

    public static getInstance(): OrderService {
        if (!OrderService.instance) {
            OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }

    private resource = '/orders';

    async list(params: object = {}): Promise<any> {
        return await this.request(this.resource, 'GET', params);
    }

    async listByCustomer(customerUuid: string, params: object = {}): Promise<any> {
        return await this.request(`/customers/orders/${customerUuid}`, 'GET', params);
    }

    async create(payload: object): Promise<any> {
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

    async restore(uuid: string): Promise<any> {
        return await this.request(`${this.resource}/${uuid}/restore`, 'POST');
    }
}

export const orderService = OrderService.getInstance();
