"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.clientErrorHandler = exports.logErrors = void 0;
const http_errors_1 = require("http-errors");
function logErrors(error, req, res, next) {
    console.error(error);
    next(error);
}
exports.logErrors = logErrors;
function clientErrorHandler(error, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    }
    else {
        next(error);
    }
}
exports.clientErrorHandler = clientErrorHandler;
function errorHandler(error, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) {
    let errorMessage = 'Unknown error';
    let statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
}
exports.errorHandler = errorHandler;
