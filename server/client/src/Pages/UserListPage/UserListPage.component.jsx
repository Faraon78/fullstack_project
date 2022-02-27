import React, { useEffect } from 'react'
import { fetchUsersStart } from '../../Redux/users/users.actions'
import { useDispatch, useSelector } from 'react-redux'

import UserList from '../../Components/UserList/UserList.component'

import './UserListPage.style.css'

function UserListPage() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsersStart())
    }, [dispatch])
    const users = useSelector((state) => state.users.users)
    console.log(users)
    return (
        <div className="content-pages">
            <UserList users={users} />
        </div>
    )
}

export default UserListPage
