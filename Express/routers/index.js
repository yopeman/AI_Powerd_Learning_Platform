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
routes.use('/analytics', analytics); // verified

export default routes;