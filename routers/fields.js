import { Router } from 'express';
import * as controllers from '../controllers/fields.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/', controllers.field_get);
routes.get('/:id', controllers.field_get_by_id);
routes.post('/', isAdmin, controllers.field_create);
routes.put('/:id', isAdmin, controllers.field_update);
routes.delete('/:id', isAdmin, controllers.field_delete);
routes.get('/:fieldId/courses', controllers.field_course);
routes.get('/:fieldId/subscriptions', isAdmin, controllers.field_subscriptions);

export default routes;