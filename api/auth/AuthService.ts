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
                localStorage.setItem('user_role', data.user.role || 'customer');
            }
            
            return { success: true, data };
        }
        
        throw new Error(data.message || 'Login failed');
    }

    async logout() {
        const token = localStorage.getItem('_token');
        
        if (!token) {
            localStorage.removeItem('_token');
            localStorage.removeItem('user_uuid');  
            localStorage.removeItem('user_role');  
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
                localStorage.removeItem('_token');
                localStorage.removeItem('user_uuid');   
                localStorage.removeItem('user_role');   
                return { success: true };
            } else {
                localStorage.removeItem('_token');
                localStorage.removeItem('user_uuid');  
                localStorage.removeItem('user_role');   
                throw new Error('Logout failed on server');
            }
        } catch (error) {
            localStorage.removeItem('_token');
            localStorage.removeItem('user_uuid');   
            localStorage.removeItem('user_role');    
            throw error;
        }
    }

    getUserUuid(): string | null {
        return localStorage.getItem('user_uuid');
    }

    getUserRole(): string | null {
        return localStorage.getItem('user_role');
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('_token');
        return !!token;
    }

    getToken(): string | null {
        return localStorage.getItem('_token');
    }
}