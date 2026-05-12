export class TeamService {
  async getTeams() {
    // fetch sample users (name, email, phone, company) for the Team page
    return await $fetch('https://jsonplaceholder.typicode.com/users')
  }
}