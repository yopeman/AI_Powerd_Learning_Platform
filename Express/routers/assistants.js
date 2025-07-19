import { Router } from 'express';
import * as controllers from '../controllers/assistants.js';
const routes = Router();

routes.post('/', controllers.assistant_create);
routes.get('/', controllers.assistant_get);
routes.delete('/:userId/fields/:fieldId', controllers.assistant_delete);

export default routes;