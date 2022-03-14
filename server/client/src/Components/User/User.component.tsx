import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function User(props: any) {
    const currentUser = props.currentUser;

    return (
        <Card sx={{ minWidth: 275, maxWidth: 1000 }} className="card-note">
            <CardContent>
                <ListItemAvatar>
                    <Avatar
                        src={currentUser.avatar}
                        alt={currentUser.userName}
                    />
                </ListItemAvatar>
                <Typography variant="h6" color="text.secondary">
                    Username: {currentUser.userName}
                </Typography>
                <Typography variant="h5" component="span">
                    Name: {currentUser.realName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    E-mail: {currentUser.email}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Phone: {currentUser.phone}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Adress: {currentUser.address}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Website: {currentUser.website}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Company: {currentUser.company}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default User;
