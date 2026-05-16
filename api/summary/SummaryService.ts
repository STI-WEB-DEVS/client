import BaseService from '~/api/BaseService';

export interface SummaryProduct {
  product_uuid: string;
  product_name: string;
  total_quantity: number;
  total_revenue: number;
}

export interface SummaryData {
  total_amount: number;
  customer_count: number;
  top_products: SummaryProduct[];
  range: {
    from: string;
    to: string;
  };
}

export interface SummaryResponse {
  data: SummaryData;
}

export class SummaryService {
  private baseService = new BaseService();

  async getSummary(params: { from?: string; to?: string } = {}): Promise<SummaryResponse> {
    return await this.baseService.request<SummaryResponse>('/summary', 'GET', params);
  }
}

export const summaryService = new SummaryService();
