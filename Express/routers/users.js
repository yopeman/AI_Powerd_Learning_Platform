import { Router } from 'express';
import * as controllers from '../controllers/users.js';
import isAuth, { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/me', isAuth, controllers.user_current_get); // verified
routes.put('/me', isAuth, controllers.user_current_update); // verified
routes.get('/', isAdmin, controllers.user_get); // verified
routes.get('/:id', isAdmin, controllers.user_get_by_id); // verified
routes.put('/:id', isAdmin, controllers.user_update); // verified
routes.delete('/:id', isAdmin, controllers.user_delete); // verified
routes.post('/', isAdmin, controllers.user_create); // verified

export default routes;