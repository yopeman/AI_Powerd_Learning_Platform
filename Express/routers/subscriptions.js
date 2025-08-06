import { Router } from 'express';
import * as controllers from '../controllers/subscriptions.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.post('/', isStudent, controllers.subscription_create); // verified
routes.get('/me/fields', isStudent, controllers.subscription_current_fields); // verified
routes.get('/:id/cancel', isStudent, controllers.subscription_cancel); // verified
routes.delete('/:id', isStudent, controllers.subscription_delete); // verified

export default routes;