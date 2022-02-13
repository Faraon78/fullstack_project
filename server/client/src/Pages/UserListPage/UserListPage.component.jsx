import React  from 'react';

import UserList from '../../Components/UserList/UserList.component';

import './UserListPage.style.css';

function UserListPage() {    
  return (
    <div className="content-pages">  
      <UserList/> 
    </div>    
  );
}
 
export default UserListPage;