import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebars() {
  return (
    <div>
      <ul>
        <li><Link to='/a-fields/me'>My Fields</Link></li>
        <li><Link to='/a-fields/get'>All Fields</Link></li>
        {/*<li><Link to='/fields'>Fields</Link></li>*/}
        {/*<li>Courses</li>*/}
        {/*<li>Chapters</li>*/}
        {/*<li>Topics</li>*/}
      </ul>
    </div>
  )
}