import React , {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfileForm from '../../Components/ProfileForm/ProfileForm.component';

import {fetchCurrentUserStart} from '../../Redux/currentUser/currentUser.actions';

function ProfilePage() {    
    const dispatch = useDispatch();

    // достаем email текущего пользователя
    const email = useSelector(state => state.currentUser.currentUser.email) || "";

    //запускаем загрузку из БД всех данных пользователя
    useEffect(() => {  //useCallback ??
      dispatch(fetchCurrentUserStart(email))  
    }, [dispatch, email]);

    //запоминаем все данные пользователя и передаем для отображения
    //const user = useSelector(state => state.currentUser.currentUser);
    const user = {
      email: "ilonmask@com", 
      password:"123456",
      userName: "maska"};
    return (   

      <ProfileForm user = {user}/>    
  );
}
 
export default ProfilePage;