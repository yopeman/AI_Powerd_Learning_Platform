import { Router } from 'express';
import * as controllers from '../controllers/fields.js';
const routes = Router();

routes.get('/', controllers.field_get);
routes.get('/:id', controllers.field_get_by_id);
routes.post('/', controllers.field_create);
routes.put('/:id', controllers.field_update);
routes.delete('/:id', controllers.field_delete);
routes.get('/:fieldId/courses', controllers.field_course);
routes.get('/:id/subscription-status', controllers.field_subscription_status);

export default routes;