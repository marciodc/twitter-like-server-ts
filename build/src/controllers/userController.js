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
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const utils_1 = require("../utils");
class UserController {
    constructor() {
        this.login = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const login = yield this.userService.login(request.body);
                response.status(200).json(login);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.signup = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const login = yield this.userService.signup(request.body);
                response.status(200).json(login);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.search = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = request.params;
                const name = request.query.q != 'null' ? String(request.query.name) : null;
                const login = yield this.userService.searchUser(userId, name);
                response.status(200).json(login);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.loginGoogle = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = request.body;
                const login = yield this.userService.loginGoogle(token);
                response.status(200).json(login);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.loginFacebook = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = request.body;
                const login = yield this.userService.loginFacebook(token);
                response.status(200).json(login);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.userService = new userService_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map