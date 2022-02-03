import React from 'react';
import { useRoutes } from './Routes/Routes';
import { useHttp } from './Hooks/http.hook';
import Buttons from './Components/Button/Buttons.component';
import Typography from '@mui/material/Typography';

import './App.css';


function App() { 
  const routes = useRoutes(false);   
  let isAuthenticated = false;  
  const {/*error,*/ request}= useHttp(); 

  const logout = async ()=>{
    try{
        const data = await request (
            ' http://localhost:5000/auth/logout', 
            'GET'            
            );
        console.log('DATA', data)
    }catch(e){

    }
}
  return (
    <div className="app">
      <header className="app-header">        
        <Typography variant="h2" component="div">MyChat</Typography>    
        {isAuthenticated && <Buttons 
        className="main-navigate-buttons" 
        onclick = {logout}>Logout
        </Buttons>}    
      </header>
        
      <div className="main">       
          {routes}        
      </div>      
    </div>
  );
}

export default App;

