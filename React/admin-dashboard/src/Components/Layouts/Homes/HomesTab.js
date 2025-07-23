import React from 'react';
import { Link } from 'react-router-dom';

export default function HomesTab() {
  return (
    <div>
      <ul>
        <li><Link to='/home/about'>About</Link></li>
        <li><Link to='/home/help'>Help</Link></li>
      </ul>
    </div>
  )
}
