import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

import './Post.style.css';

function Post(props: any) {
    const { post, user, comments } = props;
    const { body, title } = post;
    const length: number = comments.length;

    return (
        <div className="content-pages">
            <Card sx={{ minWidth: 275, maxWidth: 1000 }} className="card-note">
                <CardContent>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        Author {user.userName}
                    </Typography>

                    <Typography variant="h5" component="span">
                        {title}
                    </Typography>

                    <Typography variant="body2">{body}</Typography>
                </CardContent>
            </Card>
            <Typography
                variant="h5"
                gutterBottom
                component="div"
                className="text-header"
            >
                Comments
            </Typography>
            {!length && <h4>NO COMMENTS</h4>}
            {length > 1 && (
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 1000,
                        bgcolor: 'background.paper',
                    }}
                >
                    {comments.map((comment: any) => (
                        <div key={comment.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemText secondary={<>{comment.body}</>} />
                            </ListItem>

                            <Divider component="li" />
                        </div>
                    ))}
                </List>
            )}
        </div>
    );
}

export default Post;
