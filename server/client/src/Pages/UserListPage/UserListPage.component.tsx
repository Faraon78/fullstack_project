import React, { useEffect } from 'react';
import { fetchUsersStart } from '../../Redux/users/users.actions';
import { useDispatch } from 'react-redux';
import Selectors from '../../Redux/selectors/selectors';

import UserList from '../../Components/UserList/UserList.component';

import './UserListPage.style.css';

function UserListPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsersStart());
    }, [dispatch]);
    const { users } = Selectors();

    return (
        <div className="content-pages">
            <UserList users={users} />
        </div>
    );
}

export default UserListPage;
