export default class BaseService {
    protected async request(url: string, method: string, data?: any): Promise<any> {
        const config = useRuntimeConfig();
        const token = localStorage.getItem('_token');
        
        const headers: HeadersInit = {
            'Accept': 'application/json',
        };
        
        // Only add Content-Type for requests that have a body
        if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
            headers['Content-Type'] = 'application/json';
        }
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const options: RequestInit = {
            method,
            headers,
        };
        
        // Only add body for POST, PUT, PATCH methods
        if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(`${config.public.apiBaseURL}${url}`, options);
        
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('_token');
                window.location.href = '/';
                throw new Error('Session expired. Please login again.');
            }
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `Request failed with status ${response.status}`);
        }
        
        return response.json();
    }
}