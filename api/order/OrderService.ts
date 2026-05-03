import BaseService from '~/api/BaseService';

class OrderService extends BaseService {
    private static instance: OrderService;
    private resource = '/orders';

    public static getInstance(): OrderService {
        if (!OrderService.instance) {
            OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }

    async placeOrder(payload: object): Promise<any> {
        return await this.request(this.resource, 'POST', payload);
    }
}

export const orderService = OrderService.getInstance();