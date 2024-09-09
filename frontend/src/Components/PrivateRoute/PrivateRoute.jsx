// src/Components/PrivateRoute/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ element, allowedRoles }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // eslint-disable-next-line react/prop-types
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return element;
}

export default ProtectedRoute;
