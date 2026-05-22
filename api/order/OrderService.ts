// ~/api/order/OrderService.ts
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

  async list(params: object = {}): Promise<any> {
    return await this.request(this.resource, 'GET', params);
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


async summary(params: object = {}): Promise<any> {
  return await this.request(`${this.resource}/summary`, 'GET', params);
}
}

export const orderService = OrderService.getInstance();
