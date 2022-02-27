import React from 'react'

import { Link } from 'react-router-dom'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import './UserList.style.css'

function UserList(props) {
    const users = props.users

    if (!users.length) {
        return <div>NO USERS</div>
    }
    return (
        <List
            sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}
        >
            {users.map((user) => (
                <Link to={`/users/${user.id}`} key={user.id}>
                    <ListItem alignItems="flex-start" className="link">
                        <ListItemAvatar>
                            <Avatar alt={user.userName} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={'Username: ' + user.userName || user.email}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {'User: ' + user.realName}
                                    </Typography>
                                    {'  e-mail: ' + user.email}
                                    <br />
                                    {'city: ' + user.address}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Link>
            ))}
        </List>
    )
}

export default UserList
