import { BaseService } from "../BaseService"; 

export interface TeamUser {
  id: number;
  name: string;
  email: string;
  company?: {
    name: string;
  } | null;
  website?: string;
}

export class TeamService extends BaseService {
  async getTeams(): Promise<TeamUser[]> {
    return this.request<TeamUser[]>('/teams', 'GET');
  }

  async createTeam(teamData: object) {
    return this.request('/teams', 'POST', teamData);
  }
}
