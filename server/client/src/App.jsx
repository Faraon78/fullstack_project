import React from 'react';

import { useAuth } from './Hooks/auth.hook';
import { useSelector } from 'react-redux';
import {Routes, Route} from 'react-router-dom';

import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

import MainPage from "./Pages/MainPage/MainPage.component";
import PostPage from "./Pages/PostPage/PostPage.component";
import UserPage from "./Pages/UserPage/UserPage.component";
import UserListPage from "./Pages/UserListPage/UserListPage.component";
import AuthPage from "./Pages/AuthPage/AuthPage.component";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.component";
import NavigateMenu from "./Components/NavigateMenu/NavigateMenu.component";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.component";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import './App.css';

function App() {   

  // проверяем есть ли сохраненный токен и нужна ли аутентификация
  let token = useSelector(state => state.currentUser.token);
  let isAuthenticated = !!token;
  console.log(token, isAuthenticated);  
  
  const user = useSelector(state => state.currentUser.currentUser);  

  console.log(user);

  //подключаем функцию logout из хука  
  const {logout} = useAuth(); 

  const logoutHandler =()=>{
    logout();
    console.log(user);
    console.log(token, isAuthenticated);
  }

  return (
    <div className="app" id='app'>
      <header className="app-header">
        <Typography variant="h3" 
        component="div"
        >MyChat
        </Typography>
        
        {isAuthenticated && <Button  //кнопка LOGOUT рендерится только если пользователь вошел в систему
        variant="contained"
        size ="large"
        className="main-navigate-buttons" 
        onClick = {logoutHandler}
        >Logout
        </Button>}

      </header>
          
      <div className="content">
        {isAuthenticated && <NavigateMenu/>}
            
          <Routes>
            <Route exact path='/login' element={
              <PublicRoute  isAuthenticated={isAuthenticated}>
                <AuthPage/>
              </PublicRoute>
              }
            />
            <Route path='/register' element={
              <PublicRoute isAuthenticated={isAuthenticated}> 
                <RegisterPage/>
              </PublicRoute> 
              }
            />
            <Route path='/:page' element={
              <PrivateRoute  isAuthenticated={isAuthenticated}>
                <MainPage/>
              </PrivateRoute>
              }
            />
            <Route path='/post/:id' element={    
              <PrivateRoute  isAuthenticated={isAuthenticated}>
                <PostPage/>
              </PrivateRoute>
              }
            />
            <Route path='/users/:id' element={ 
              <PrivateRoute  isAuthenticated={isAuthenticated}>
                <UserPage />
              </PrivateRoute> 
              }
            />
            <Route exact path='/users' element={     
              <PrivateRoute  isAuthenticated={isAuthenticated}>
                <UserListPage />
              </PrivateRoute>
              }
            />
            <Route path='/myprofile' element={   
              <PrivateRoute  isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </PrivateRoute>
              }
            />
            <Route exact path='/' element={ 
              <PrivateRoute  isAuthenticated={isAuthenticated}>
                <MainPage/>
              </PrivateRoute>
              }
            />
          </Routes>
      </div>
    </div>    
  );
}

export default App;

