"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidacaoForms = void 0;
const error_1 = require("./error");
class ValidacaoForms extends error_1.AppError {
    constructor(fields) {
        super('Falha validando os dados', 300);
        this.fields = fields || {};
    }
}
exports.ValidacaoForms = ValidacaoForms;
//# sourceMappingURL=error_validacao.js.map