"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorized = exports.ok = exports.serverError = exports.badRequest = void 0;
const errors_1 = require("../../errors");
const badRequest = (error) => ({
    statusCode: 400,
    body: error,
});
exports.badRequest = badRequest;
const serverError = (error) => ({
    statusCode: 500,
    body: new errors_1.ServerError(error.stack),
});
exports.serverError = serverError;
const ok = (data) => ({
    statusCode: 200,
    body: data,
});
exports.ok = ok;
const unauthorized = () => ({
    statusCode: 401,
    body: new errors_1.UnauthorizedError(),
});
exports.unauthorized = unauthorized;
