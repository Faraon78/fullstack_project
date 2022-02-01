import React from 'react';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

import './PostsList.style.css';

function PostsList(props) {
  const posts = useSelector(state => state.posts.posts);  
  
  const pageItemStart = (props.page-1)*8;
  const pageItemEnd = (props.page*8);  
  const pagePosts = posts.slice(pageItemStart, pageItemEnd)
  
    if (!posts.length){
      return <div>NO POSTS</div>
    }
 console.log("Страница " + props.page)

  return (
  <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
    {pagePosts.map(post =><Link to={`/post/${post.id}`} key={post.id}><ListItem alignItems="flex-start" className='link' >
      <ListItemText
        primary={post.title}
        secondary={<React.Fragment>
          {post.body}
        </React.Fragment>} />

    </ListItem><Divider component="li" /></Link>
)}
</List>
   ) ;
}
export default PostsList;
