import { Router } from 'express';
import * as controllers from '../controllers/feedbacks.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/', isAdmin, controllers.feedback_get);
routes.get('/:id', isAdmin, controllers.feedback_get_by_id);
routes.post('/', controllers.feedback_create);
routes.delete('/:id', isAdmin, controllers.feedback_delete);

export default routes;