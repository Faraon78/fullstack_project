import React from 'react'
import { useSelector } from 'react-redux'
//import {selectAllPosts, selectPageCountPosts } from '../../Redux/store/selectors'
import { Link } from 'react-router-dom'
import { config } from '../../config'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'

import './PostsList.style.css'

function PostsList(props) {
    const posts = useSelector((state) => state.posts.posts)
    //const posts = selectAllPosts
    const pageItemStart = (props.page - 1) * config.COUNTITEMONPAGE
    const pageItemEnd = props.page * config.COUNTITEMONPAGE
    const pagePosts = posts.slice(pageItemStart, pageItemEnd)

    if (!posts.length) {
        return <div className="noPosts">NO POSTS</div>
    }
    //console.log('Страница ' + props.page)

    return (
        <List
            sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}
        >
            {pagePosts.map((post) => (
                <Link to={`/post/${post.id}`} key={post.id}>
                    <ListItem alignItems="flex-start" className="link">
                        <ListItemText
                            primary={post.title}
                            secondary={
                                <React.Fragment>{post.body}</React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider component="li" />
                </Link>
            ))}
        </List>
    )
}
export default PostsList
