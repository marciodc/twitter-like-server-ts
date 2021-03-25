"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formataErros = void 0;
const error_nao_autorizado_1 = require("./error_nao_autorizado");
const error_validacao_1 = require("./error_validacao");
function formataErros(res, erro) {
    if (erro instanceof error_nao_autorizado_1.NaoAutorizado) {
        return res.status(401).json({
            message: erro.message,
            status: erro.status
        });
    }
    else if (erro instanceof error_validacao_1.ValidacaoForms) {
        return res.status(500).json({
            message: erro.message,
            campos: erro.fields
        });
    }
    else if (erro.name && erro.name === 'SequelizeValidationError') {
        var campos = [];
        erro.errors.map(function (err) {
            campos.push({
                campo: err.path,
                message: err.message
            });
        });
        return res.status(500).json({
            message: 'Erro validando dados',
            campos: campos
        });
    }
    else if (erro instanceof Error) {
        if (erro.message) {
            return res.status(500).json({
                message: erro.message
            });
        }
        else {
            return res.status(500).json(erro);
        }
    }
    else {
        return res.status(500).json(erro);
    }
}
exports.formataErros = formataErros;
//# sourceMappingURL=trata_erro.js.map