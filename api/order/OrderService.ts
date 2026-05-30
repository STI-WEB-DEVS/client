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

  async show(uuid: string): Promise<any> {
    return await this.request(`${this.resource}/${uuid}`, 'GET');
  }

  async placeOrder(customer_uuid: string, items: { product_uuid: string; quantity: number }[]): Promise<any> {
    return await this.request(this.resource, 'POST', { customer_uuid, items });
  }

  async delete(uuid: string): Promise<any> {
    return await this.request(`${this.resource}/${uuid}`, 'DELETE');
  }
}

export const orderService = OrderService.getInstance();