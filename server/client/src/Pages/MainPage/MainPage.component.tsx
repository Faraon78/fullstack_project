import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useParams, Link, NavLink, useNavigate } from 'react-router-dom';
import { config } from '../../config';

import PostsList from '../../Components/PostsList/PostsList.component';
import { useHttp } from '../../Hooks/http.hook';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import { fetchPostsStart } from '../../Redux/posts/posts.actions';
//import { fetchUsersStart } from '../../Redux/users/users.actions';
import { fetchCurrentPostsStart } from '../../Redux/currentPosts/currentPosts.actions';

import Selectors from '../../Redux/selectors/selectors';
import './MainPage.style.css';

function MainPage() {
    const [checked, setChecked] = React.useState(false);
    let { posts, id, currentPosts } = Selectors();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchPostsStart());
    }, [dispatch, navigate]);

    useEffect(() => {
        dispatch(fetchCurrentPostsStart(id));
    }, [dispatch, id]);

    let { page }: any = useParams();

    page = Number(page) || 1;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    const handlePostDelete = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            await request(
                `http://localhost:5000/post/${event.target.id}`,
                'DELETE',
                {
                    credentials: true,
                }
            );
            dispatch(fetchPostsStart());
            navigate('/', { replace: true });
        } catch (e: any) {
            console.log(e.message);
        }
    };
    if (checked) {
        posts = currentPosts;
        page = 1;
    }
    const count = Math.ceil(posts.length / config.COUNTITEMONPAGE);

    return (
        <div className="content-pages">
            <div className="select">
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
                <div>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <label className="switch">MY POSTS</label>
                </div>
            </div>
            <PostsList
                page={page}
                posts={posts}
                ifChecked={checked}
                handlePostDelete={handlePostDelete}
            />
        </div>
    );
}

export default MainPage;
