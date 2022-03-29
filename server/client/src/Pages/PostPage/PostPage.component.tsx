import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';
import { fetchCommentsStart } from '../../Redux/comments/comments.actions';
import { fetchUserForPostStart } from '../../Redux/userForPost/userForPost.actions';
import Selectors from '../../Redux/selectors/selectors';

import Post from '../../Components/Post/Post.component';

function PostPage() {
    const { id }: any = useParams<{ id: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCommentsStart(id));
    }, [dispatch, id]);
    useEffect(() => {
        dispatch(fetchUserForPostStart(id));
    }, [dispatch, id]);

    const { posts, userForPost, comments } = Selectors();

    const post: any = posts.find((post: any) => +post.id === +id);

    return <Post post={post} comments={comments} user={userForPost} />;
}

export default PostPage;
