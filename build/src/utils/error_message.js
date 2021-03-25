"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroMessage = void 0;
const error_1 = require("./error");
class ErroMessage extends error_1.AppError {
    constructor(message = null) {
        super('Erro', 500);
        this.message = message;
    }
}
exports.ErroMessage = ErroMessage;
//# sourceMappingURL=error_message.js.map