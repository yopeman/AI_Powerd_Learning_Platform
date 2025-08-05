import React from 'react'
import {Link} from "react-router-dom";

export default function CertificatesTab() {
  return (
    <div>
      <ul>
        <li><Link to='/certificates/get'>Get Certificates</Link></li>
        {/*<li>Get Certificates By Id</li>*/}
        {/*<li>Delete Certificates</li>*/}
      </ul>
    </div>
  )
}
