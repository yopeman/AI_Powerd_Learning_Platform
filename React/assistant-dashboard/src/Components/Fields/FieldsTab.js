import React from 'react';
import { Link } from 'react-router-dom';

export default function FieldsTab() {
  return (
    <div>
      <ul>
        <li><Link to='/fields/me'>My Fields</Link></li>
        <li><Link to='/fields/get'>All Fields</Link></li>
        <li>Detail</li>
      </ul>
    </div>
  )
}
