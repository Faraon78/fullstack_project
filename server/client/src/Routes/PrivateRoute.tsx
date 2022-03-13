import { Navigate } from 'react-router-dom';
import Selectors from '../Redux/selectors/selectors';

function PrivateRoute({ children }: any) {
    const { isAuthenticated } = Selectors();

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
