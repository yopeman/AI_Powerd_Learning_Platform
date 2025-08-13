import { Router } from 'express';
import * as controllers from '../controllers/amounts.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/', isAdmin, controllers.amount_get);
routes.put('/', isAdmin, controllers.amount_update);

export default routes;