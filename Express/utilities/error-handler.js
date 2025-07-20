import fs from 'fs';

function handler(req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
}

function error_handler(err, req, res, next) {
    console.error(`${new Date().toISOString()} - ${err.message} \n\n`);
    fs.writeFileSync('error.log', `${new Date().toISOString()} - ${err.message} - ${err.stack}\n\n`, { flag: 'a' });

    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        status: err.status || 500,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        success: false,
    });
}

export {
    handler,
    error_handler,
};