import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Admin Components
import AdminDashboard from '../Admin/Dashboard';
import Users from '../Admin/Users/Users';
import CreateUser from '../Admin/Users/CreateUser';
import UserDetails from '../Admin/Users/UserDetails';
import UpdateUser from '../Admin/Users/UpdateUser';
import DeleteUser from '../Admin/Users/DeleteUser';

import Fields from '../Admin/Fields/Fields';
import CreateField from '../Admin/Fields/CreateField';
import FieldDetails from '../Admin/Fields/FieldDetails';
import UpdateField from '../Admin/Fields/UpdateField';
import DeleteField from '../Admin/Fields/DeleteField';
import FieldSubscriptions from '../Admin/Fields/FieldSubscriptions';

import Assistants from '../Admin/Assistants/Assistants';
import CreateAssistant from '../Admin/Assistants/CreateAssistant';
import AssistantDetails from '../Admin/Assistants/AssistantDetails';
import UpdateAssistant from '../Admin/Assistants/UpdateAssistant';
import DeleteAssistant from '../Admin/Assistants/DeleteAssistant';

import Analytics from '../Admin/Analytics/Analytics';
import Amounts from '../Admin/Amounts/Amounts';
import Feedbacks from '../Admin/Feedbacks/Feedbacks';
import FeedbackDetails from '../Admin/Feedbacks/FeedbackDetails';
import DeleteFeedback from '../Admin/Feedbacks/DeleteFeedback';
import Certificates from '../Admin/Certificates/Certificates';
import DeleteCertificate from '../Admin/Certificates/DeleteCertificate';

// Assistant Components
import AssistantDashboard from '../Assistant/Dashboard';
import MyFields from '../Assistant/Fields/MyFields';
import FieldDetailsAssistant from '../Assistant/Fields/FieldDetails';
import Courses from '../Assistant/Courses/Courses';
import CreateCourse from '../Assistant/Courses/CreateCourse';
import CourseDetails from '../Assistant/Courses/CourseDetails';
import UpdateCourse from '../Assistant/Courses/UpdateCourse';
import DeleteCourse from '../Assistant/Courses/DeleteCourse';

import Chapters from '../Assistant/Chapters/Chapters';
import CreateChapter from '../Assistant/Chapters/CreateChapter';
import ChapterDetails from '../Assistant/Chapters/ChapterDetails';
import UpdateChapter from '../Assistant/Chapters/UpdateChapter';
import DeleteChapter from '../Assistant/Chapters/DeleteChapter';

import Topics from '../Assistant/Topics/Topics';
import CreateTopic from '../Assistant/Topics/CreateTopic';
import TopicDetails from '../Assistant/Topics/TopicDetails';
import UpdateTopic from '../Assistant/Topics/UpdateTopic';
import DeleteTopic from '../Assistant/Topics/DeleteTopic';

// Shared Components
import About from '../Shared/About';
import Help from '../Shared/Help';
import PageNotFound from '../Shared/PageNotFound';

export default function MainContent() {
  const { isAdmin, isAssistant } = useAuth();

  if (isAdmin()) {
    return (
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        
        {/* User Management */}
        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/:id/edit" element={<UpdateUser />} />
        <Route path="/users/:id/delete" element={<DeleteUser />} />
        
        {/* Field Management */}
        <Route path="/fields" element={<Fields />} />
        <Route path="/fields/create" element={<CreateField />} />
        <Route path="/fields/:id" element={<FieldDetails />} />
        <Route path="/fields/:id/edit" element={<UpdateField />} />
        <Route path="/fields/:id/delete" element={<DeleteField />} />
        <Route path="/fields/:id/subscriptions" element={<FieldSubscriptions />} />
        
        {/* Assistant Management */}
        <Route path="/assistants" element={<Assistants />} />
        <Route path="/assistants/create" element={<CreateAssistant />} />
        <Route path="/assistants/:id" element={<AssistantDetails />} />
        <Route path="/assistants/:id/edit" element={<UpdateAssistant />} />
        <Route path="/assistants/:id/delete" element={<DeleteAssistant />} />
        
        {/* Analytics */}
        <Route path="/analytics/*" element={<Analytics />} />
        
        {/* Amounts */}
        <Route path="/amounts" element={<Amounts />} />
        
        {/* Feedbacks */}
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/feedbacks/:id" element={<FeedbackDetails />} />
        <Route path="/feedbacks/:id/delete" element={<DeleteFeedback />} />
        
        {/* Certificates */}
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/certificates/:id/delete" element={<DeleteCertificate />} />
        
        {/* Shared */}
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }

  if (isAssistant()) {
    return (
      <Routes>
        <Route path="/" element={<AssistantDashboard />} />
        
        {/* Field Management */}
        <Route path="/my-fields" element={<MyFields />} />
        <Route path="/my-fields/:id" element={<FieldDetailsAssistant />} />
        
        {/* Course Management */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/field/:fieldId" element={<Courses />} />
        <Route path="/courses/create/:fieldId" element={<CreateCourse />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses/:id/edit" element={<UpdateCourse />} />
        <Route path="/courses/:id/delete" element={<DeleteCourse />} />
        
        {/* Chapter Management */}
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/chapters/course/:courseId" element={<Chapters />} />
        <Route path="/chapters/create/:courseId" element={<CreateChapter />} />
        <Route path="/chapters/:id" element={<ChapterDetails />} />
        <Route path="/chapters/:id/edit" element={<UpdateChapter />} />
        <Route path="/chapters/:id/delete" element={<DeleteChapter />} />
        
        {/* Topic Management */}
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/chapter/:chapterId" element={<Topics />} />
        <Route path="/topics/create/:chapterId" element={<CreateTopic />} />
        <Route path="/topics/:id" element={<TopicDetails />} />
        <Route path="/topics/:id/edit" element={<UpdateTopic />} />
        <Route path="/topics/:id/delete" element={<DeleteTopic />} />
        
        {/* Shared */}
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }

  return <PageNotFound />;
}