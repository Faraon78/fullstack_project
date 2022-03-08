import React, { useEffect } from 'react';
import { fetchUsersStart } from '../../Redux/users/users.actions';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../Hooks/storeHook';

import UserList from '../../Components/UserList/UserList.component';

import './UserListPage.style.css';

function UserListPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsersStart());
    }, [dispatch]);
    const users = useAppSelector((state) => state.users.users);

    return (
        <div className="content-pages">
            <UserList users={users} />
        </div>
    );
}

export default UserListPage;
