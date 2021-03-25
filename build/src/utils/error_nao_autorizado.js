"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoAutorizado = void 0;
const error_1 = require("./error");
class NaoAutorizado extends error_1.AppError {
    constructor(message = null) {
        super('Não Autorizado', 401);
        this.message = message || 'Acesso não autorizado';
    }
}
exports.NaoAutorizado = NaoAutorizado;
//# sourceMappingURL=error_nao_autorizado.js.map