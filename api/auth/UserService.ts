import BaseService from '~/api/BaseService'

class UserService extends BaseService {
  private static instance: UserService

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  private resource = '/user'

  async profile(): Promise<any> {
    return await this.request(this.resource, 'GET')
  }
}

export const userService = UserService.getInstance()
