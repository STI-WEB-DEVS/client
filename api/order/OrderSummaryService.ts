import BaseService from '~/api/BaseService';

class OrderSummaryService extends BaseService {
    private static instance: OrderSummaryService;

    public static getInstance(): OrderSummaryService {
        if (!OrderSummaryService.instance) {
            OrderSummaryService.instance = new OrderSummaryService();
        }
        return OrderSummaryService.instance;
    }

    private resource = '/admin/order-summary';

    async fetch(params: Record<string, string | number | undefined> = {}): Promise<any> {
        const query = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                query.append(key, String(value));
            }
        });

        const url = query.toString() ? `${this.resource}?${query.toString()}` : this.resource;
        return await this.request(url, 'GET');
    }
}

export const orderSummaryService = OrderSummaryService.getInstance();
