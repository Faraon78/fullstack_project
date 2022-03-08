import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useParams, Link, NavLink } from 'react-router-dom';
import { config } from '../../config';

import PostsList from '../../Components/PostsList/PostsList.component';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Button from '@mui/material/Button';

import { fetchPostsStart } from '../../Redux/posts/posts.actions';
import { fetchUsersStart } from '../../Redux/users/users.actions';
import { useAppSelector } from '../../Hooks/storeHook';

import './MainPage.style.css';

function MainPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPostsStart());
    }, [dispatch]);
    useEffect(() => {
        dispatch(fetchUsersStart());
    }, [dispatch]);

    let { page }: any = useParams<string>();
    page = Number(page) || 1;

    const posts = useAppSelector((state) => state.posts.posts);

    const count = Math.ceil(posts.length / config.COUNTITEMONPAGE);

    return (
        <div className="content-pages">
            <NavLink to="/addpost">
                <Button variant="contained" type="button">
                    ADD POST
                </Button>
            </NavLink>
            <Pagination
                count={count}
                page={page}
                color="primary"
                className="pagescount"
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`/${item.page === 1 ? '' : `${item.page}`}`}
                        {...item}
                    />
                )}
            />

            <PostsList page={page} posts={posts} />
        </div>
    );
}

export default MainPage;
