import React from 'react';
import { Link } from 'react-router-dom';

export default function FieldsTab() {
  return (
    <div>
      <ul>
        <li><Link to='/fields/create'>Create Fields</Link></li>
        <li><Link to='/fields/get'>Get Fields</Link></li>
        {/*<li>Get Fields By ID</li>*/}
        {/*<li>Update Fields</li>*/}
        {/*<li>Delete Fields</li>*/}
        {/*<li>Field Subscription Status</li>*/}
      </ul>
    </div>
  )
}
