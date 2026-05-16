import BaseService from '~/api/BaseService';

interface AnalyticsResponse {
  total_revenue: number;
  total_customers: number;
  top_products: Array<{
    uuid: string;
    name: string;
    total_quantity: number;
    total_orders: number;
  }>;
}

export class DashboardService extends BaseService {
  async getAnalytics(startDate?: string, endDate?: string): Promise<AnalyticsResponse> {
    const params: Record<string, string> = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    return this.request<AnalyticsResponse>(
      '/orders/revenue',
      'GET',
      params
    );
  }
}

export default new DashboardService();
