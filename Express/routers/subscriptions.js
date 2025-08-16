import { Router } from 'express';
import * as controllers from '../controllers/subscriptions.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/:id', controllers.subscription_get_by_id);
routes.post('/', isStudent, controllers.subscription_create);
routes.get('/me/fields', isStudent, controllers.subscription_current_fields);
routes.delete('/:id', controllers.subscription_delete);

export default routes;