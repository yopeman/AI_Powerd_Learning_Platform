import React from 'react'
import {Link} from "react-router-dom";

export default function FeedbacksTab() {
  return (
    <div>
      <ul>
        <li><Link to='/feedbacks/get'>Get Feedbacks</Link></li>
        {/*<li>Get Feedbacks By Id</li>*/}
        {/*<li>Delete Feedbacks</li>*/}
      </ul>
    </div>
  )
}
