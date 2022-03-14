import React from 'react';

import { Link, NavLink } from 'react-router-dom';
import { config } from '../../config';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

import './PostsList.style.css';

function PostsList(props: any) {
    const { posts, ifChecked, handlePostDelete } = props;

    const pageItemStart: number = (props.page - 1) * config.COUNTITEMONPAGE;
    const pageItemEnd: number = props.page * config.COUNTITEMONPAGE;
    const pagePosts = posts.slice(pageItemStart, pageItemEnd);

    if (!posts.length) {
        return <div className="noPosts">NO POSTS</div>;
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}
        >
            {pagePosts.map((post: any) => (
                <div key={post.id}>
                    <Link to={`/post/${post.id}`}>
                        <ListItem alignItems="flex-start" className="link">
                            <ListItemText
                                primary={post.title}
                                secondary={<>{post.body}</>}
                            />
                        </ListItem>
                    </Link>
                    <div className="btn_group">
                        {ifChecked && (
                            <>
                                <Button
                                    variant="contained"
                                    type="button"
                                    size="small"
                                    className="but_comment"
                                    onClick={handlePostDelete}
                                    id={post.id}
                                >
                                    DELETE POST
                                </Button>
                            </>
                        )}
                        <NavLink to={`/addcomment/${post.id}`}>
                            <Button
                                variant="contained"
                                type="button"
                                size="small"
                                className="but_comment"
                            >
                                ADD COMMENT
                            </Button>
                        </NavLink>
                    </div>
                    <Divider component="li" />
                </div>
            ))}
        </List>
    );
}
export default PostsList;
