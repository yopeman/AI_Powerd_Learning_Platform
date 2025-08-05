import React from 'react'
import {Link} from "react-router-dom";

export default function AmountsTab() {
  return (
    <div>
      <ul>
        <li><Link to='/amounts/get'>Get Amounts</Link></li>
        <li><Link to='/amounts/update'>Update Amounts</Link></li>
      </ul>
    </div>
  )
}
