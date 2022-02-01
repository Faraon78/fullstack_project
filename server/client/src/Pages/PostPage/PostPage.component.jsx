import React from 'react';

import { useParams } from 'react-router-dom';

import Post from '../../Components/Post/Post.component';

function PostPage() {
    
  let {id} = useParams();
  
  return(  
       <Post id={id}/>
   )
}

export default PostPage;