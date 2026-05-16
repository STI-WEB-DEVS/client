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

    async create(payload: object): Promise<any> {
        return await this.request(this.resource, 'POST', payload);
    }

    async show(uuid: string): Promise<any> {
        return await this.request(`${this.resource}/${uuid}`, 'GET');
    }

    async getSummary(from?: string, to?: string): Promise<any> {
        const params: any = {};
        if (from) params.from = from;
        if (to) params.to = to;
        
        return await this.request(`${this.resource}/summary`, 'GET', params);
    }
}

export const orderService = OrderService.getInstance();
