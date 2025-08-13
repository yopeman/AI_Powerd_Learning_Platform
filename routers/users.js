import { Router } from 'express';
import * as controllers from '../controllers/users.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/me', controllers.user_current_get);
routes.put('/me', controllers.user_current_update);
routes.get('/', isAdmin, controllers.user_get);
routes.get('/:id', isAdmin, controllers.user_get_by_id);
routes.put('/:id', isAdmin, controllers.user_update);
routes.delete('/:id', isAdmin, controllers.user_delete);
routes.post('/', isAdmin, controllers.user_create);

export default routes;