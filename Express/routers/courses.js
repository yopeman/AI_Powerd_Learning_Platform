import { Router } from 'express';
import * as controllers from '../controllers/courses.js';
const routes = Router();

routes.get('/:courseId/chapters', controllers.course_chapter);
routes.post('/', controllers.course_create);
routes.put('/:id', controllers.course_update);
routes.delete('/:id', controllers.course_delete);

export default routes;