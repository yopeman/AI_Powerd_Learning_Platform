import React from 'react';
import { Link } from 'react-router-dom';

export default function AnalyticsTab() {
  return (
    <div>
      <ul>
        <li><Link to='/analytics/fields'>Field Analytics</Link></li>
        <li><Link to='/analytics/topics'>Topic Analytics</Link></li>
        <li><Link to='/analytics/subscriptions'>Subscription Analytics</Link></li>
        <li><Link to='/analytics/payments'>Payments Analytics</Link></li>
        <li><Link to='/analytics/users'>User Analytics</Link></li>
      </ul>
    </div>
  )
}
