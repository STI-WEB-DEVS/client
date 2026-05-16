import BaseService from "~/api/BaseService";

class OrderService extends BaseService {
  private static instance: OrderService;

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  private resource = "/orders";

  async create(payload: object): Promise<any> {
    return await this.request(this.resource, "POST", payload);
  }

  async summary(params: object = {}): Promise<any> {
    // backend route is /order/summary
    return await this.request("/order/summary", "GET", params);
  }
}

export const orderService = OrderService.getInstance();
