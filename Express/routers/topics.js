import { Router } from 'express';
import * as controllers from '../controllers/topics.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/:id', isAssistant, controllers.topic_get_by_id); // verified
routes.post('/', isAssistant, controllers.topic_create); // verified
routes.put('/:id', isAssistant, controllers.topic_update); // verified
routes.delete('/:id', isAssistant, controllers.topic_delete); // verified
routes.get('/:id/content', isStudent, controllers.topic_content); // verified
routes.post('/:id/ask', isStudent, controllers.topic_ask); // verified
routes.get('/:topicId/interactions/me', isStudent, controllers.topic_current_interactions); // verified

export default routes;