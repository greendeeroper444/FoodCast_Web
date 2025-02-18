import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({children}) {
    const {admin, error} = useSelector((state) => state.admin);

    if (!admin) {
        if (error) {
            return <Navigate to="/" />;
        }
    }

  return children;
}

export default ProtectedRoute;
