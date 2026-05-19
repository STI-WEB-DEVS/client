export const useAuth = () => {
  const getToken = () => {
    if (import.meta.client) {
      return localStorage.getItem('token');
    }
    return null;
  };

  const getUser = () => {
    if (import.meta.client) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  };

  const getRoles = () => {
    if (import.meta.client) {
      const roles = localStorage.getItem('roles');
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  const hasRole = (role: string) => {
    const roles = getRoles();
    return roles.includes(role);
  };

  const logout = () => {
    if (import.meta.client) {
      localStorage.removeItem('token');
      localStorage.removeItem('uuid');
      localStorage.removeItem('roles');
      localStorage.removeItem('user');
    }
  };

  return {
    getToken,
    getUser,
    getRoles,
    isAuthenticated,
    hasRole,
    logout,
  };
};