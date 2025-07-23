import React from 'react';
import { Link } from 'react-router-dom';

export default function UsersTab() {
  return (
    <div>
      <ul>
        <li><Link to='/users/create'>Create Users</Link></li>
        <li><Link to='/users/get'>Get Users</Link></li>
        {/* <li>Get Users By ID</li>
        <li>Update Users</li>
        <li>Delete Users</li> */}
      </ul>
    </div>
  )
}
