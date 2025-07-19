import { Router } from 'express';
import * as controllers from '../controllers/auths.js';
const routes = new Router();

routes.post('/register', controllers.auth_register);
routes.post('/login', controllers.auth_login);
routes.post('/logout', controllers.auth_logout);

export default routes;