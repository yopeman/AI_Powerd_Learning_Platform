import { Router } from 'express';
import * as controllers from '../controllers/analytics.js';
const routes = Router();

routes.get('/fields', controllers.analytic_fields);
routes.get('/topics', controllers.analytic_topics);
routes.get('/subscriptions', controllers.analytic_subscriptions);
routes.get('/users', controllers.analytic_users);

export default routes;