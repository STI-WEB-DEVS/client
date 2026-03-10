import { BaseService } from "../BaseService"; 

export class TeamService extends BaseService {
  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  async getTeams() {
    return this.request('/users');
  }
}