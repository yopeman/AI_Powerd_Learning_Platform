import { Router } from 'express';
import auths from './auths.js';
import analytics from './analytics.js';
import assistants from './assistants.js';
import chapters from './chapters.js';
import courses from './courses.js';
import fields from './fields.js';
import payments from './payments.js';
import subscriptions from './subscriptions.js';
import topics from './topics.js';
import users from './users.js';
import amounts from './amounts.js';
import feedbacks from './feedbacks.js';
import certifications from './certifications.js';
import uploads from './uploads.js';
const routes = Router();

routes.use('/auths', auths); // verified
routes.use('/fields', fields); // verified
routes.use('/assistants', assistants); // verified
routes.use('/courses', courses); // verified
routes.use('/chapters', chapters); // verified
routes.use('/topics', topics); // verified
routes.use('/subscriptions', subscriptions); // verified
routes.use('/payments', payments); // verified
routes.use('/users', users); // verified
routes.use('/amounts', amounts);
routes.use('/feedbacks', feedbacks);
routes.use('/certifications', certifications);
routes.use('/analytics', analytics); // verified
routes.use('/uploads', uploads);

export default routes;