import { Navigate } from 'react-router-dom';

function PublicRoute({ children }: any, isAuthenticated: boolean) {
    // return !isAuthenticated ? children : <Navigate to="/" />;
    if (!isAuthenticated) {
        return children;
    }
    return <Navigate to="/login" />;
}

export default PublicRoute;
