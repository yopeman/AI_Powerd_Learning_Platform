import { Router } from 'express';
import * as controllers from '../controllers/chapters.js';
const routes = Router();

routes.get('/:chapterId/topics', controllers.chapter_topics);
routes.post('/', controllers.chapter_create);
routes.put('/:id', controllers.chapter_update);
routes.delete('/:id', controllers.chapter_delete);

export default routes;