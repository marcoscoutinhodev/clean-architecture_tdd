"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogControllerDecorator = void 0;
class LogControllerDecorator {
    constructor(controller, logErrorRepository) {
        this.controller = controller;
        this.logErrorRepository = logErrorRepository;
    }
    async handle(httpRequest) {
        var _a;
        const httpResponse = await this.controller.handle(httpRequest);
        if (httpResponse.statusCode === 500) {
            await ((_a = this.logErrorRepository) === null || _a === void 0 ? void 0 : _a.logError(httpResponse.body.stack));
        }
        return httpResponse;
    }
}
exports.LogControllerDecorator = LogControllerDecorator;
