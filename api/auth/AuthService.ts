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
            
            if (data.user) {
                localStorage.setItem('user_uuid', data.user.uuid);
                localStorage.setItem('customer_id', data.user.customer_id ? String(data.user.customer_id) : '');
                localStorage.setItem('customer_uuid', data.user.customer_uuid || '');
                localStorage.setItem('user_role', data.user.role || 'customer');
            }
            
            return { success: true, data, user: data.user };
        }
        
        throw new Error(data.message || 'Login failed');
    }

    async logout() {
        const token = localStorage.getItem('_token');
        
        // Clear everything regardless of API call outcome
        localStorage.removeItem('_token');
        localStorage.removeItem('user_uuid');  
        localStorage.removeItem('customer_id');
        localStorage.removeItem('customer_uuid');
        localStorage.removeItem('user_role');  
        
        if (!token) {
            return { success: true };
        }
        
        try {
            const response = await fetch(`${this.apiBase}/logout`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                return { success: true };
            } else {
                throw new Error('Logout failed on server');
            }
        } catch (error) {
            console.error('Logout API error:', error);
            throw error;
        }
    }

    getUserUuid(): string | null {
        return localStorage.getItem('user_uuid');
    }

    getUserRole(): string | null {
        return localStorage.getItem('user_role');
    }

    getCustomerId(): string | null {
        return localStorage.getItem('customer_id');
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('_token');
        return !!token;
    }

    getToken(): string | null {
        return localStorage.getItem('_token');
    }
}