// src/components/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  if (userInfo) {
    // If user is already logged in, redirect to home
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;