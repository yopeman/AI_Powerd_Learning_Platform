import { Router } from 'express';
import * as controllers from '../controllers/chapters.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/:chapterId/topics', controllers.chapter_topics); // verified
routes.post('/', isAssistant, controllers.chapter_create); // verified
routes.put('/:id', isAssistant, controllers.chapter_update); // verified
routes.delete('/:id', isAssistant, controllers.chapter_delete); // verified

export default routes;