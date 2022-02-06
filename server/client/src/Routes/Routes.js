import React from "react";
import {Route, Routes} from 'react-router-dom';

import MainPage from "../Pages/MainPage/MainPage.component";
import PostPage from "../Pages/PostPage/PostPage.component";
import UserPage from "../Pages/UserPage/UserPage.component";
import UserListPage from "../Pages/UserListPage/UserListPage.component";
import AuthPage from "../Pages/AuthPage/AuthPage.component";
import ProfilePage from "../Pages/ProfilePage/ProfilePage.component";
import NavigateMenu from "../Components/NavigateMenu/NavigateMenu.component";

export const useRoutes = (isAuthenticated) => {
  
    if(isAuthenticated){
        return(
          <div className="content">
              <NavigateMenu/>
            <div className="content-pages">
              <Routes>                
                <Route path='/:page' element={<MainPage/>}/>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/post/:id' element={<PostPage/>}/>
                <Route path='/users/:id' element={<UserPage />}/>
                <Route path='/users' element={<UserListPage />}/>
                <Route path='/myprofile' element={<ProfilePage />}/>
            </Routes>
          </div>
        </div>
      )
  }

    return (
      <main className="main">
        <Routes>
            <Route exact path='/' element={<AuthPage/>}/>            
        </Routes>
        
      </main>
    )
} 