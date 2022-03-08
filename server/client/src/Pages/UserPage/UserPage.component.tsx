import React from 'react';
import { useParams } from 'react-router-dom';

import User from '../../Components/User/User.component';
import { useAppSelector } from '../../Hooks/storeHook';

function UserPage() {
    const { id } = useParams();
    const users = useAppSelector((state) => state.users.users);
    const currentUser: object = users.find(
        (user: any) => +user.id === +Number(id)
    );
    return (
        <div className="content-pages">
            <User currentUser={currentUser} />
        </div>
    );
}

export default UserPage;
