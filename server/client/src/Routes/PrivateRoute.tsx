import { Navigate /*, Route*/ } from 'react-router-dom';
//import { useAppSelector } from '../Hooks/storeHook';
function PrivateRoute({ children }: any, isAuthenticated: boolean) {
    console.log(isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
    /*return (
        isAuthenticated ?
        <Route 
            path={path}
            element={children}
        />
        :  <> <Navigate to="/login" /> </>  
    )*/
}
export default PrivateRoute;
