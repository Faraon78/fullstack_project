import React from 'react';
import { useParams } from 'react-router-dom';

import User from '../../Components/User/User.component';
import Selectors from '../../Redux/selectors/selectors';

function UserPage() {
    const { id } = useParams();
    const { users } = Selectors();
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
