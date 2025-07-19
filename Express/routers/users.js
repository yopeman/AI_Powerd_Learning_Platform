import { Router } from 'express';
import * as controllers from '../controllers/users.js';
const routes = Router();

routes.get('/me', controllers.user_current_get);
routes.put('/me', controllers.user_current_update);
routes.get('/users', controllers.user_get);
routes.get('/:id', controllers.user_get_by_id);
routes.put('/:id', controllers.user_update);
routes.delete('/:id', controllers.user_delete);

export default routes;