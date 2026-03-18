import { BaseService } from "../BaseService"; 

export class TeamService extends BaseService {
  constructor() {
    super('https://jsonplacehoslder.typicode.com');
  }

  async getTeams() {
    return this.request('/users');
  }
}