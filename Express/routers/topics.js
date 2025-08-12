import { Router } from 'express';
import * as controllers from '../controllers/topics.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/:id', isAssistant, controllers.topic_get_by_id);
routes.post('/', isAssistant, controllers.topic_create);
routes.put('/:id', isAssistant, controllers.topic_update);
routes.delete('/:id', isAssistant, controllers.topic_delete);
routes.get('/:id/content', isStudent, controllers.topic_content);
routes.post('/:id/ask', isStudent, controllers.topic_ask);
routes.get('/:topicId/interactions/me', isStudent, controllers.topic_current_interactions);

export default routes;