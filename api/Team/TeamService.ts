import { BaseService } from "../BaseService"; 

export class TeamService extends BaseService {
  async getTeams() {
    // Note: Ensure your backend actually uses /customers for the Team list
    return this.request('/customers', 'GET');
  }

  async createTeam(teamData: object) {
    return this.request('/teams', 'POST', teamData);
  }
}