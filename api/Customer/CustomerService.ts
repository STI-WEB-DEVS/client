// import { BaseService } from "../BaseService"; 

// export class TeamService extends BaseService {
//   async getTeams() {
//     return this.request('/customers', 'GET');
//   }

//   async createTeam(teamData: object) {
//     return this.request('/teams', 'POST', teamData);
//   }
// }

import { BaseService } from "../BaseService";

interface Customer {
  id: number;
  name: string;
  email: string;
}

// Laravel Pagination Structure
interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}

export class CustomerService extends BaseService {
  async getCustomers() {
    // We expect a PaginatedResponse containing an array of Customers
    return this.request<PaginatedResponse<Customer>>('/customers', 'GET');
  }
}