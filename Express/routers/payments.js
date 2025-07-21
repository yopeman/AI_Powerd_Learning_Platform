import { Router } from 'express';
import * as controllers from '../controllers/payments.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.post('/', isStudent, controllers.payment_create) // verified
routes.get('/webhook', controllers.payment_webhook); // verified
routes.get('/:id', controllers.payment_get_by_id); // verified

export default routes;