import { Router } from 'express';
import auths from './auths.js';
import analytics from './analytics.js';
import assistants from './assistants.js';
import chapters from './chapters.js';
import courses from './courses.js';
import fields from './fields.js';
import interactions from './interactions.js';
import payments from './payments.js';
import subscriptions from './subscriptions.js';
import topics from './topics.js';
import users from './users.js';
const routes = Router();

routes.use('/auths', auths); // verified
routes.use('/fields', fields);
routes.use('/courses', courses);
routes.use('/chapters', chapters);
routes.use('/topics', topics);
routes.use('/interactions', interactions);
routes.use('/assistants', assistants);
routes.use('/users', users);
routes.use('/subscriptions', subscriptions);
routes.use('/payments', payments);
routes.use('/analytics', analytics);

export default routes;