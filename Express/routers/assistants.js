import { Router } from 'express';
import * as controllers from '../controllers/assistants.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.post('/', isAdmin, controllers.assistant_create); // verified
routes.get('/', isAdmin, controllers.assistant_get); // verified
routes.get('/:id', isAdmin, controllers.assistant_get_by_id); // verified
routes.put('/:id', isAdmin, controllers.assistant_update); // verified
routes.delete('/:id', isAdmin, controllers.assistant_delete); // verified
routes.get('/me/fields', isAssistant, controllers.assistant_current_fields);

export default routes;