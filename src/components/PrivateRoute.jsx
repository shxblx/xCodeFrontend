// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  if (!userInfo) {
    // If user is not logged in, redirect to signup
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default PrivateRoute;