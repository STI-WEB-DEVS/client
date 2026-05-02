export interface OrderItem {
  product_uuid: string;
  quantity: number;
}

export interface CreateOrderPayload {
  customer_uuid: string;
  items: OrderItem[];
}

export interface OrderResponse {
  message: string;
  data?: any;
}

export class OrderService {
  async createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
    const runtimeConfig = useRuntimeConfig();
    const token = localStorage.getItem("_token");

    try {
      return await $fetch<OrderResponse>("/orders", {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        error?.response?._data?.message ||
        error?.data?.message ||
        error?.message;

      switch (status) {
        case 400:
        case 401:
        case 404:
        case 422:
          throw new Error(message || "Invalid order request.");
        case 500:
          throw new Error("Server error. Please try again.");
        default:
          throw new Error(message || "Something went wrong.");
      }
    }
  }
}