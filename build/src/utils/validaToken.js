"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaToken = void 0;
const models_1 = require("../models");
function validaToken(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.url === '/public' || request.url === '/user/signup' ||
            request.url === '/user/login' || request.url === '/user/login/google' ||
            request.url === '/user/login/facebook') {
            next();
            return;
        }
        try {
            let authorization = request.headers['authorization'];
            if (authorization) {
                authorization = authorization.toString().replace('Bearer', '').trim();
                if (authorization.match(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[8|9|aA|bB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/m)) {
                    const token = yield models_1.Token.findOne({ where: { token: authorization } });
                    if (token) {
                        next();
                    }
                    else {
                        response.status(401).json({ result: false, message: 'Token nao localizado' });
                    }
                }
                else {
                    response.status(401).json({ result: false, message: 'Token inválido' });
                }
            }
            else {
                if (!authorization) {
                    response.status(401).json({ result: false, message: 'Acesso negado' });
                }
            }
        }
        catch (e) {
            next(e);
        }
    });
}
exports.validaToken = validaToken;
//# sourceMappingURL=validaToken.js.map