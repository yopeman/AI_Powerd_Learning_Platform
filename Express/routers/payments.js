import { Router } from 'express';
import * as controllers from '../controllers/payments.js';
const routes = Router();

routes.post('/webhook', controllers.payment_webhook);
routes.get('/:id', controllers.payment_get_by_id);

export default routes;