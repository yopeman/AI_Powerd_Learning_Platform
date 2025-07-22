import { Router } from 'express';
import * as controllers from '../controllers/users.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/me', controllers.user_current_get); // verified
routes.put('/me', controllers.user_current_update); // verified
routes.get('/', isAdmin, controllers.user_get); // verified
routes.get('/:id', isAdmin, controllers.user_get_by_id); // verified
routes.put('/:id', isAdmin, controllers.user_update); // verified
routes.delete('/:id', isAdmin, controllers.user_delete); // verified

export default routes;