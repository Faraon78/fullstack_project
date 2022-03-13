import { Navigate } from 'react-router-dom';
import Selectors from '../Redux/selectors/selectors';

function PublicRoute({ children }: any) {
    const { isAuthenticated } = Selectors();

    return !isAuthenticated ? children : <Navigate to="/" />;
}

export default PublicRoute;
