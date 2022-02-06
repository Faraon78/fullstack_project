import React , {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfileForm from '../../Components/ProfileForm/ProfileForm.component';

import {fetchCurrentUserStart} from '../../Redux/currentUser/currentUser.actions';

function ProfilePage() {
    const dispatch = useDispatch();

    // достаем id текущего пользователя из localStorage
    const data=localStorage.getItem("userData");
    const id = JSON.parse(data).userId;
    console.log(id);
    
    //запускаем загрузку из БД всех данных пользователя
    useEffect(() => {  //useCallback ??
      console.log("запустили загрузку, id= ", id);
      
      dispatch(fetchCurrentUserStart(id));
    }, [dispatch, id]);
    const user = useSelector(state => state.currentUser.currentUser);
    //запоминаем все данные пользователя и передаем для отображения
    //const user = useSelector(state => state.currentUser.currentUser);
    /*const user = {
      email: "ilonmask@com", 
      password:"123456",
      userName: "maska"};*/
      console.log("user: ", user);
    return (

      <ProfileForm user = {user}/>
  );
}
 
export default ProfilePage;