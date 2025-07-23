import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomesTab from '../Homes/HomesTab';
import UsersTab from '../../Users/UsersTab';
import FieldsTab from '../../Fields/FieldsTab';
import AssistantsTab from '../../Assistants/AssistantsTab';
import AnalyticsTab from '../../Analytics/AnalyticsTab';

export default function MenuTabs() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomesTab />} />
        <Route path='/home/*' element={<HomesTab />} />
        <Route path='/users/*' element={<UsersTab />} />
        <Route path='/fields/*' element={<FieldsTab />} />
        <Route path='/assistants/*' element={<AssistantsTab />} />
        <Route path='/analytics/*' element={<AnalyticsTab />} />
      </Routes>
    </div>
  )
}
