import React from 'react';
import { NavLink } from 'react-router-dom';

import Buttons from '../Button/Buttons.component';

function NavigateMenu (){

    return(
        <nav className="main-navigate">
          <NavLink to="/1">
             <Buttons className="main-navigate-buttons">POSTS</Buttons> 
          </NavLink>
          <NavLink to="/users">
            <Buttons className="main-navigate-buttons">USERS</Buttons> 
          </NavLink>
          <NavLink to="/myprofile">
            <Buttons className="main-navigate-buttons">MY PROFILE</Buttons> 
          </NavLink>
        </nav>
    )
}

export default NavigateMenu;