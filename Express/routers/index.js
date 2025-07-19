import { Router } from 'express';
import analytics from './analytics.js';
import assistants from './assistants.js';
import auths from './auths.js';
import chapters from './chapters.js';
import courses from './courses.js';
import fields from './fields.js';
import interactions from './interactions.js';
import payments from './payments.js';
import subscriptions from './subscriptions.js';
import topics from './topics.js';
import users from './users.js';
const routes = Router();

routes.use('/analytics', analytics);
routes.use('/assistants', assistants);
routes.use('/auths', auths);
routes.use('/chapters', chapters);
routes.use('/courses', courses);
routes.use('/fields', fields);
routes.use('/interactions', interactions);
routes.use('/payments', payments);
routes.use('/subscriptions', subscriptions);
routes.use('/topics', topics);
routes.use('/users', users);

export default routes;