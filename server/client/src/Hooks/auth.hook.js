import {useState, useCallback, useEffect} from 'react';
import { useDispatch } from 'react-redux';

import {updateCurrentUser} from '../Redux/currentUser/currentUser.actions';

export const useAuth = () =>{
    const [token, setToken] = useState(null);
    const [userId, setUserId] =useState(null);
    const storageName ="userData";
    const dispatch = useDispatch();

    const login = useCallback((jwtToken, id) => {
        
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId:id, token:jwtToken
        }))
    }, []);
    
    const logout = useCallback(() =>{
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
        dispatch(updateCurrentUser({}));        
        console.log(localStorage.getItem(storageName));
        console.log("token ", token);
        console.log("завершили logout");

    }, [dispatch, token]);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName));

        if(data && data.token){
            login(data.token, data.userId);
        }
    }, [login]);

    return {login, logout, token, userId};

}
