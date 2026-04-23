export class AuthService {
    private apiBase: string;

    constructor() {
        const config = useRuntimeConfig();
        this.apiBase = config.public.apiBaseURL;
    }

    async login(email: string, password: string) {
        const response = await fetch(`${this.apiBase}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok && data.token) {
            localStorage.setItem('_token', data.token);
            return { success: true, data };
        }
        
        throw new Error(data.message || 'Login failed');
    }

    async logout() {
        const token = localStorage.getItem('_token');
        
        if (!token) {
            localStorage.removeItem('_token');
            return { success: true };
        }
        
        try {
            const response = await fetch(`${this.apiBase}/logout`, {
                method: 'DELETE',  // Changed from POST to DELETE
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                localStorage.removeItem('_token');
                return { success: true };
            } else {
                // If server returns error, still clear local token
                localStorage.removeItem('_token');
                throw new Error('Logout failed on server');
            }
        } catch (error) {
            // If network error, still clear local token
            localStorage.removeItem('_token');
            throw error;
        }
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('_token');
        return !!token;
    }

    getToken(): string | null {
        return localStorage.getItem('_token');
    }
}