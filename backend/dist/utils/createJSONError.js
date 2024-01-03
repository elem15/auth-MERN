"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJSONError = void 0;
const createJSONError = (res, status, message) => {
    res.status(status).json({ error: message });
};
exports.createJSONError = createJSONError;
