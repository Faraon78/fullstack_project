import React from "react";
import {Route, Routes} from 'react-router-dom';

import MainPage from "../Pages/MainPage/MainPage.component";
import PostPage from "../Pages/PostPage/PostPage.component";
import UserPage from "../Pages/UserPage/UserPage.component";
import UserListPage from "../Pages/UserListPage/UserListPage.component";
import AuthPage from "../Pages/AuthPage/AuthPage.component";
import NavigateMenu from "../Components/NavigateMenu/NavigateMenu.component";


export const useRoutes = () => {
  let isAuthenticated = false;
    if(isAuthenticated){
        return(
          <main className="main">
               <NavigateMenu/>            
            <Routes>
                <Route path='/:page' element={<MainPage/>}/>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/post/:id' element={<PostPage/>}/>
                <Route path='/users/:id' element={<UserPage />}/>
                <Route path='/users' element={<UserListPage />}/>                               
            </Routes>             
          </main>
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