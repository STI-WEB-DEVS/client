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

export class CustomerService extends BaseService {
  async getCustomers() {
    return this.request('/customers', 'GET');
  }
  async createCustomer(customerData: object) {
    return this.request('/customers', 'POST', customerData);
  }
}
