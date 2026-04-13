import { BaseService } from "../BaseService";

export class TeamService extends BaseService {
  async getTeams(): Promise<{ data: Customer[] }> {
    return this.request<{ data: Customer[] }>('/customers', 'GET');
  }

  async createTeam(teamData: object) {
    return this.request('/customers', 'POST', teamData);
  }
}