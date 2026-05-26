import BaseService from '~/api/BaseService';

// Interfaces matching your Laravel OrderService backend expectations
export interface OrderItemPayload {
    product_uuid: string;
    quantity: number;
}

export interface CreateOrderPayload {
    customer_uuid: string;
    items: OrderItemPayload[];
}

export interface UpdateOrderPayload {
    // Add expected updatable fields based on your repository requirements (e.g., status, tracking)
    [key: string]: any; 
}

class OrderService extends BaseService {
    private static instance: OrderService;

    public static getInstance(): OrderService {
        if (!OrderService.instance) {
            OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }

    private resource = '/orders';

    /**
     * Maps to listOrder(int $perPage)
     */
    async list(params: { perPage?: number; page?: number } & object = {}): Promise<any> {
        return await this.request(this.resource, 'GET', params);
    }

    /**
     * Maps to createOrder(array $payload)
     * Enforces the required structural array format: customer_uuid and items
     */
    async create(payload: CreateOrderPayload): Promise<any> {
        return await this.request(this.resource, 'POST', payload);
    }

    /**
     * Maps to getOrder(string $uuid)
     * Note: In your backend, getOrder searches by CUSTOMER UUID to return their order history
     */
    async show(customerUuid: string): Promise<any> {
        return await this.request(`${this.resource}/${customerUuid}`, 'GET');
    }

    /**
     * Maps to updateOrder(string $uuid, array $payload)
     */
    async update(uuid: string, payload: UpdateOrderPayload): Promise<any> {
        return await this.request(`${this.resource}/${uuid}`, 'PUT', payload);
    }

    /**
     * Maps to deleteOrder(string $uuid)
     */
    async delete(uuid: string): Promise<any> {
        return await this.request(`${this.resource}/${uuid}`, 'DELETE');
    }

    /**
     * Maps to restoreOrder(string $uuid)
     */
    async restore(uuid: string): Promise<any> {
        return await this.request(`${this.resource}/${uuid}/restore`, 'POST');
    }
}

export const orderService = OrderService.getInstance();