"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, status, fields) {
        super(message);
        this.name = this.constructor.name;
        this.fields = fields;
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=error.js.map