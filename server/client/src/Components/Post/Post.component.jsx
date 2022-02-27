import React, { useEffect } from 'react'
import { useDispatch /*, useSelector */ } from 'react-redux'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'

import { fetchCommentsStart } from '../../Redux/comments/comments.actions'
import {
    selectAllPosts,
    selectAllUsers,
    selectAllComments,
} from '../../Redux/store/selectors'

import './Post.style.css'

function Post(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCommentsStart(props.id))
    }, [dispatch, props.id])

    //const posts = useSelector((state) => state.posts.posts)
    const posts = selectAllPosts

    const post = posts.find((post) => +post.id === +props.id)
    //const users = useSelector((state) => state.users.users)
    const users = selectAllUsers

    const user = users.find((user) => +user.id === +post.userId)
    //const comments = useSelector((state) => state.comments.comments)
    const comments = selectAllComments

    return (
        <div className="content-pages">
            <Card sx={{ minWidth: 275, maxWidth: 1000 }} className="card-note">
                <CardContent>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        Author
                    </Typography>
                    <Typography variant="h5" component="span">
                        {user.username}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {post.title}
                    </Typography>
                    <Typography variant="body2">{post.body}</Typography>
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
            <List
                sx={{
                    width: '100%',
                    maxWidth: 1000,
                    bgcolor: 'background.paper',
                }}
            >
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={comment.name}
                                secondary={
                                    <React.Fragment>
                                        {comment.body}
                                    </React.Fragment>
                                }
                            />
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                                className="email"
                            >
                                {comment.email}
                            </Typography>
                        </ListItem>

                        <Divider component="li" />
                    </div>
                ))}
            </List>
        </div>
    )
}

export default Post
