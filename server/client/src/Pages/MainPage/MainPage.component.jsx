import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import PostsList from '../../Components/PostsList/PostsList.component'

import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'

import { fetchPostsStart } from '../../Redux/posts/posts.actions'
import { fetchUsersStart } from '../../Redux/users/users.actions'

import './MainPage.style.css'

function MainPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPostsStart())
    }, [dispatch])
    useEffect(() => {
        dispatch(fetchUsersStart())
    }, [dispatch])

    let { page } = useParams()
    page = page || 1
    console.log(page)

    const posts = useSelector((state) => state.posts.posts)
    const count = Math.ceil(posts.length / 8)

    return (
        <div className="content-pages">
            <Pagination
                count={count}
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

            <PostsList page={page} />
        </div>
    )
}

export default MainPage
