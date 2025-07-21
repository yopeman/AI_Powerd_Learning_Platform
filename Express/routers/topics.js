import { Router } from 'express';
import * as controllers from '../controllers/topics.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/:id', isAssistant, controllers.topic_get_by_id); // verified
routes.post('/', isAssistant, controllers.topic_create); // verified
routes.put('/:id', isAssistant, controllers.topic_update); // verified
routes.delete('/:id', isAssistant, controllers.topic_delete); // verified
// routes.post('/:id/generate-content', isStudent, controllers.topic_generate_content);
routes.get('/:id/content', isStudent, controllers.topic_content);
routes.post('/:id/ask', isStudent, controllers.topic_ask);

export default routes;