import { Router } from 'express';
import * as controllers from '../controllers/topics.js';
const routes = Router();

routes.get('/:id', controllers.topic_get_by_id);
routes.post('/', controllers.topic_create);
routes.put('/:id', controllers.topic_update);
routes.delete('/:id', controllers.topic_delete);
// routes.post('/:id/generate-content', controllers.topic_generate_content);
routes.get('/:id/content', controllers.topic_content);
routes.post('/:id/ask', controllers.topic_ask);

export default routes;