import { Router } from 'express';
import * as controllers from '../controllers/analytics.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/fields', isAdmin, controllers.analytic_fields);
routes.get('/topics', isAdmin, controllers.analytic_topics);
routes.get('/subscriptions', isAdmin, controllers.analytic_subscriptions);
routes.get('/users', isAdmin, controllers.analytic_users);
routes.get('/payments', isAdmin, controllers.analytic_payments);
routes.get('/feedbacks', isAdmin, controllers.analytic_feedbacks);
routes.get('/certifications', isAdmin, controllers.analytic_certifications);

export default routes;