import BaseService from '~/api/BaseService';

export class AuthService extends BaseService {
    /**
     * Authenticate a user and return the token + user data.
     * Mirrors: POST /api/login → UserService::loginUser()
     */
    async login(email: string, password: string): Promise<any> {
        return await this.request('/login', 'POST', { email, password });
    }

    /**
     * Revoke the current access token from the database.
     * Mirrors: DELETE /api/logout → UserService::logoutUser()
     *
     * The backend calls $user->currentAccessToken()->delete()
     * which removes the row from the personal_access_tokens table
     * for the token that was sent in the Authorization header.
     *
     * Returns the response so the caller can check for success
     * before clearing the local token.
     */
    async logout(): Promise<any> {
        return await this.request('/logout', 'DELETE');
    }

    /**
     * Store the token in localStorage after a successful login.
     */
    setToken(token: string): void {
        localStorage.setItem('_token', token);
    }

    /**
     * Remove the token from localStorage.
     */
    clearToken(): void {
        localStorage.removeItem('_token');
    }

    /**
     * Check if a token exists in localStorage.
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('_token');
    }
}
