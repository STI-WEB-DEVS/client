import { BaseService } from "../BaseService"; 

export class TeamService extends BaseService {
  // Updated method name and route to fetch from customers
  async getCustomers() {
    return this.request('/customers', 'GET');
  }

  async createTeam(teamData: object) {
    return this.request('/teams', 'POST', teamData);
  }
}