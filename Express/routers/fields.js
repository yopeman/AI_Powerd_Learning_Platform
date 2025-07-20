import { Router } from 'express';
import * as controllers from '../controllers/fields.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/', controllers.field_get); // verified
routes.get('/:id', controllers.field_get_by_id); // verified
routes.post('/', isAdmin, controllers.field_create); // verified
routes.put('/:id', isAdmin, controllers.field_update); // verified
routes.delete('/:id', isAdmin, controllers.field_delete); // verified
routes.get('/:fieldId/courses', controllers.field_course); // verified
routes.get('/:fieldId/subscriptions', isAdmin, controllers.field_subscriptions); // verified

export default routes;