import { Router } from 'express';
import * as controllers from '../controllers/interactions.js';
const routes = Router();

routes.get('/', controllers.interaction_get);

export default routes;