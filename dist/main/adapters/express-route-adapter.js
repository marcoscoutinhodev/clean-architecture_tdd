"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
const adaptRoute = (controller) => async (req, res) => {
    const httpRequest = { body: req.body };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode !== 200) {
        return res
            .status(httpResponse.statusCode)
            .json({ error: httpResponse.body.message });
    }
    return res
        .status(httpResponse.statusCode)
        .json(httpResponse.body);
};
exports.adaptRoute = adaptRoute;
