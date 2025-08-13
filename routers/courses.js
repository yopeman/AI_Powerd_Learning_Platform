import { Router } from 'express';
import * as controllers from '../controllers/courses.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/:id', controllers.course_get);
routes.get('/:courseId/chapters', controllers.course_chapter);
routes.post('/', isAssistant, controllers.course_create);
routes.put('/:id', isAssistant, controllers.course_update);
routes.delete('/:id', isAssistant, controllers.course_delete);

export default routes;