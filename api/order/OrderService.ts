import { BaseService } from "~/api/BaseService";

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

  async listByCustomer(customerUuid: string): Promise<any> {
    return await this.request(`/customers/${customerUuid}/orders`, "GET");
  }

  async summary(params?: { from: string; to: string }): Promise<any> {
    return await this.request(`${this.resource}/summary`, "GET", params ?? {});
  }
}

export const orderService = OrderService.getInstance();
