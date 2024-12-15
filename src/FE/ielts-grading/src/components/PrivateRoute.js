import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function PrivateRoute({ children }) {
  const isAuthenticated = AuthService.getToken();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

export default PrivateRoute; 