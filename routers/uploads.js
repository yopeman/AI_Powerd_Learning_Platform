import { Router } from 'express';
import multer from 'multer';
import * as controllers from '../controllers/uploads.js';
import { isAdmin, isAssistant, isStudent } from '../utilities/auths.js';
const routes = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

routes.get('/', controllers.upload_get);
routes.get('/:name', controllers.upload_download);
routes.post('/', isAdmin, upload.single('file'), controllers.upload_new);
routes.delete('/:name', isAdmin, controllers.upload_delete);

export default routes;