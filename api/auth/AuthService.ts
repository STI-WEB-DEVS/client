import BaseService from '~/api/BaseService';

export class AuthService extends BaseService {
    async login(email: string, password: string): Promise<any> {
        return await this.request('/login', 'POST', { email, password });
    }

    async logout(): Promise<any> {
        return await this.request('/logout', 'DELETE');
    }
}
