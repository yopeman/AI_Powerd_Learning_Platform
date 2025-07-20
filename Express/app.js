import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routers/index.js';
import auth_routes from './routers/auths.js';
import { handler, error_handler } from './utilities/error-handler.js';
import { sequelize } from './models/index.js';
import request_parser from './utilities/requests.js';
import isAuth from './utilities/auths.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(request_parser);
app.get('/api', (req, res) => { res.json('AiPLP is lived...') })
app.use(auth_routes);
app.use('/api/v1/', isAuth, routes);
app.use(handler);
app.use(error_handler);
sequelize.sync().then().catch();

app.listen(process.env.PORT, (e) => {
    if (e) console.error(e);
    console.log(`Server started on port ${process.env.PORT}`);
});