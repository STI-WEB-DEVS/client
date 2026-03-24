/*import { BaseService } from "../BaseService"; 

export class TeamService extends BaseService {
  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  async getTeams() {
    return this.request('/users');
  }
}*/
// api/TeamService.ts
export interface TeamMember {
  id: number;
  name: string;
  role: 'Admin' | 'Attendant' | 'Technician';
  email: string;
  status: 'online' | 'offline';
}

export const TeamService = {
  getAllMembers(): TeamMember[] {
    return [
      { id: 1, name: 'Alex Rivera', role: 'Admin', email: 'alex@smartpark.com', status: 'online' },
      { id: 2, name: 'Jordan Smith', role: 'Attendant', email: 'jordan@smartpark.com', status: 'online' },
      { id: 3, name: 'Sam Chen', role: 'Technician', email: 'sam@smartpark.com', status: 'offline' },
      { id: 4, name: 'Taylor Reed', role: 'Attendant', email: 'taylor@smartpark.com', status: 'online' },
    ];
  }
};