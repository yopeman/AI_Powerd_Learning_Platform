import { Router } from 'express';
import * as controllers from '../controllers/chapters.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/:id', controllers.chapter_get);
routes.get('/:chapterId/topics', controllers.chapter_topics);
routes.post('/', isAssistant, controllers.chapter_create);
routes.put('/:id', isAssistant, controllers.chapter_update);
routes.delete('/:id', isAssistant, controllers.chapter_delete);

export default routes;