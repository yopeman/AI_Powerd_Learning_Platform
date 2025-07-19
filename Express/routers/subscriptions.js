import { Router } from 'express';
import * as controllers from '../controllers/subscriptions.js';
const routes = Router();

routes.post('/', controllers.subscription_create);
routes.get('/:id', controllers.subscription_get);
routes.post('/:id/cancel', controllers.subscription_cancel);

export default routes;