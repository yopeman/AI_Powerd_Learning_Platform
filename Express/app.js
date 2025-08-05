import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routers/index.js';
import auth_routes from './routers/auths.js';
import { handler, error_handler } from './utilities/error-handlers.js';
import { sequelize } from './models/index.js';
import request_parser from './utilities/requests.js';
import isAuth from './utilities/auths.js';
import { payment_webhook } from './controllers/payments.js';
import {get_my_certificate_doc, redirect_certification_doc} from "./controllers/certifications.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(request_parser);
app.get('/api', (req, res) => { res.json('AiPLP server is lived...') })
app.use(auth_routes);
app.use('/payments/webhook', payment_webhook);
app.use('/certifications/field/:fieldId/user/:userId/doc', get_my_certificate_doc);
app.use('/results/:resultId/link', redirect_certification_doc);
app.use('/api/v1/', isAuth, routes);
app.use(handler);
app.use(error_handler);
sequelize.sync().then().catch();

app.listen(process.env.PORT, (e) => {
    if (e) console.error(e);
    console.log(`http://127.0.0.1:${process.env.PORT}/api`);
});