import React from 'react';
import {useLocation, useHistory, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import store from "../../../Utilities/data-storage";
import Token from "../../../Utilities/token";

export default function Headers() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate(1);
  };
  const handlePreviousPage = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1><center><Link to='/'>Admin Dashboard</Link></center></h1>
      <Token/>
      <div>
        <button onClick={handlePreviousPage}>&lt;</button>
        <button onClick={handleNextPage}>&gt;</button>
        # {location.pathname}
        <Link to='/profile' style={{float: 'right'}}>Profile</Link>
      </div><br/>
      <p><sub><sup><small>{store.get('token') || 'mmm'}</small></sup></sub></p>
    </div>
  )
}
