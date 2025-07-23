import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebars() {
  return (
    <div>
      <ul>
        <li><Link to='/users'>Users</Link></li>
        <li><Link to='/fields'>Fields</Link></li>
        <li><Link to='/assistants'>Assistants</Link></li>
        <li><Link to='/analytics'>Analytics</Link></li>
      </ul>
    </div>
  )
}
