import BaseService from '~/api/BaseService';

class DashboardService extends BaseService {
    private static instance: DashboardService;

    public static getInstance(): DashboardService {
        if (!DashboardService.instance) {
            DashboardService.instance = new DashboardService();
        }
        return DashboardService.instance;
    }

    async getOrderSummary(from: string, to: string): Promise<any> {
        return await this.request('/dashboard/order-summary', 'GET', { from, to });
    }
}

export const dashboardService = DashboardService.getInstance();