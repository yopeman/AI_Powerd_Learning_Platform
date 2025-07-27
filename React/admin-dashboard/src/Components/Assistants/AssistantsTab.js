import React from 'react';
import { Link } from 'react-router-dom';

export default function AssistantsTab() {
  return (
    <div>
      <ul>
        <li><Link to='/assistants/create'>Create Assistants</Link></li>
        <li><Link to='/assistants/get'>Get Assistants</Link></li>
        {/*<li>Get Assistants By ID</li>*/}
        {/*<li>Update Assistants</li>*/}
        {/*<li>Delete Assistants</li>*/}
      </ul>
    </div>
  )
}
