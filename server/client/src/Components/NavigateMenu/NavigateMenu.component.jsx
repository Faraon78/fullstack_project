import React from 'react'
import { NavLink } from 'react-router-dom'

import Button from '../Button/Button.component'

function NavigateMenu() {
    return (
        <nav className="main-navigate">
            <NavLink to="/1">
                <Button className="main-navigate-buttons">POSTS</Button>
            </NavLink>
            <NavLink to="/users">
                <Button className="main-navigate-buttons">USERS</Button>
            </NavLink>
            <NavLink to="/myprofile">
                <Button className="main-navigate-buttons">MY PROFILE</Button>
            </NavLink>
        </nav>
    )
}

export default NavigateMenu
