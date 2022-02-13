import React from 'react';
import { useParams } from 'react-router-dom';

import User from '../../Components/User/User.component';

function UserPage() {
    
  let {id} = useParams();
  console.log(id);
  return(
    <div className="content-pages">
       <User id={id}/>
    </div>
   )
}

export default UserPage;