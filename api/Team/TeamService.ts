import { BaseService } from "../BaseService"; 

export type Customer = {
  id: number;
  name: string;
  email: string;
  website: string;
  company?: {
    name?: string;
  };
};

export class TeamService extends BaseService {
  async getTeams() {
    const response = await this.request<any>('/user', 'GET');

    if (Array.isArray(response)) {
      return response as Customer[];
    }

    if (Array.isArray(response?.data)) {
      return response.data as Customer[];
    }

    if (Array.isArray(response?.users)) {
      return response.users as Customer[];
    }

    if (Array.isArray(response?.customers)) {
      return response.customers as Customer[];
    }

    return [];
  }

  async createTeam(teamData: object) {
    return this.request('/customers', 'POST', teamData);
  }
}
