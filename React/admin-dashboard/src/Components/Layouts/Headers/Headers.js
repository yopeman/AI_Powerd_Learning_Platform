import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Headers() {
  const location = useLocation();
  return (
    <div>
      <h1><Link to='/'>Admin Dashboard</Link></h1>
      <p>{location.pathname}</p>
    </div>
  )
}
