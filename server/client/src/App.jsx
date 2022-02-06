import React from 'react';
import { useRoutes } from './Routes/Routes';
import { useAuth } from './Hooks/auth.hook';
import { AuthContext } from './context/authContext';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import './App.css';

function App() { 
  
  const {token, login, logout, userId} = useAuth();  
  let isAuthenticated = !!token;
  console.log(token, isAuthenticated);
  
  const routes = useRoutes(isAuthenticated); 
  const user = useSelector(state => state.currentUser.currentUser);  
  console.log(user);
  const logoutHandler =()=>{
    logout();
    console.log(user);
    console.log(token, isAuthenticated);
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <div className="app">
        <header className="app-header">        
          <Typography variant="h3" 
          component="div"
          >MyChat
          </Typography>    
          
          {isAuthenticated && <Button 
          variant="contained" 
          size ="large"  
          className="main-navigate-buttons" 
          onClick = {logoutHandler}  
          >Logout
          </Button>}  

        </header>
          
        <div>       
            {routes}        
        </div>      
      </div>
    </AuthContext.Provider>
  );
}

export default App;

