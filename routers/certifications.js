import { Router } from 'express';
import * as controllers from '../controllers/certifications.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

routes.get('/field/:fieldId/user/:userId/doc', controllers.get_my_certificate_doc);
routes.get('/results/:resultId/link', controllers.redirect_certification_doc);
routes.get('/field/:fieldId/questions', isStudent, controllers.certification_questions);
routes.post('/results', isStudent, controllers.certification_result);
routes.get('/results', isAdmin, controllers.certification_get_results);
routes.get('/results/:resultId', isAdmin, controllers.certification_get_by_id);
routes.delete('/:resultId', isAdmin, controllers.certification_delete);

export default routes;