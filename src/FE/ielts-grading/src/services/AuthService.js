import api from './ApiService';
import { jwtDecode } from 'jwt-decode';

const AuthService = {
  async login(username, password) {
    const response = await api.post('/users/login', { username, password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      const decodedToken = jwtDecode(response.data.access_token);
      localStorage.setItem('user', JSON.stringify(decodedToken));
    }
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/users/me');
    return response.data;
  },

  getCurrentUserRole() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          this.logout();
          return null;
        }
        return decodedToken;
      }
      return null;
    } catch (error) {
      return null;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  hasRole(role) {
    const user = this.getCurrentUserRole();
    return user?.role === role;
  },

  isTeacher() {
    return this.hasRole('teacher');
  },

  isAdmin() {
    return this.hasRole('admin');
  },

  getDashboardRoute() {
    const user = this.getCurrentUserRole();
    switch (user?.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      default:
        return '/dashboard';
    }
  }
};

export default AuthService;
