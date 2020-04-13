import express from 'express';
import httpError from 'http-errors';
import bodyParser from 'body-parser';

import routes from '../routes/index.route.js';
import {apiFailureHandler} from '../app/helpers/globalFunction.js';

const app = express();

// set body data in request
app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));

// API normal router
app.use('/api/v1/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new httpError(404);
    res.send(apiFailureHandler(404, err.message, {}), 404);
});

app.use((err, req, res, next) => {
    try {
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Content-Type', 'application/json; charset=utf-8');

        res.status(err.status || 500).send(apiFailureHandler(null, {}, err.status || 500));
        next();
    } catch (error) {
        res.status(err.status || 500).send(apiFailureHandler(error.message, {}, err.status || 500));
        next(error.message);
    }
});

export default app;