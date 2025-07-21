import { Router } from 'express';
import * as controllers from '../controllers/courses.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/:courseId/chapters', controllers.course_chapter); // verified
routes.post('/', isAssistant, controllers.course_create); // verified
routes.put('/:id', isAssistant, controllers.course_update); // verified
routes.delete('/:id', isAssistant, controllers.course_delete); // verified

export default routes;