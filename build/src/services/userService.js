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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = require("bcrypt");
const models_1 = require("../models");
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const bcrypt_2 = __importDefault(require("bcrypt"));
const google_auth_library_1 = require("google-auth-library");
const nodeFbLogin = require('node-fb-login');
class UserService {
    constructor() {
        this.encryptPassword = function (password) {
            return bcrypt_2.default.hashSync(password, 10);
        };
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findOne({ where: {
                        email: data.email
                    }
                });
                if (!user) {
                    throw new Error('Usuário ou senha inválido');
                }
                const result = bcrypt_1.compareSync(data.password, user.password);
                if (!user || !result) {
                    throw new Error('Usuário ou senha inválido');
                }
                yield models_1.Token.destroy({
                    where: {
                        userId: user.id
                    }
                });
                const token = uuid_1.v4();
                yield models_1.Token.create({
                    token: token,
                    userId: user.id
                });
                return { id: user.id, name: user.name, token: token };
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield models_1.User.create({
                    name: data.name,
                    email: data.email,
                    password: this.encryptPassword(data.password)
                });
                const token = uuid_1.v4();
                const newToken = yield models_1.Token.create({
                    token: token,
                    userId: user.id
                });
                return { id: user.id, name: user.name, token: newToken.token };
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    searchUser(userId, nome) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new database_1.Database;
            try {
                return yield db.connection.query(`
          select u.id, u."name", 
          case
          when f.user_id = $1 then true
          else
          false
          end
          as following 
          from users u
          left join following f on f.follow_user_id = u.id 
          where upper(u.name) ilike $2
        `, { bind: [userId, nome.toUpperCase() + '%'], type: sequelize_1.QueryTypes.SELECT });
            }
            catch (e) {
                throw new Error(e);
            }
            finally {
                db.connection.close;
            }
        });
    }
    loginGoogle(gtoken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
                const ticket = yield client.verifyIdToken({
                    idToken: gtoken,
                    audience: process.env.GOOGLE_ID
                });
                const { name, email } = ticket.getPayload();
                return this.verifyUser(name, email);
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    loginFacebook(ftoken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email } = yield nodeFbLogin.getUserProfile({
                    accessToken: ftoken,
                    fields: ["name", "email"]
                });
                return this.verifyUser(name, email);
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    verifyUser(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield models_1.User.findOne({ where: {
                    email: email
                }
            });
            if (!user) {
                const tempPassword = uuid_1.v4();
                user = yield models_1.User.create({
                    name: name,
                    email: email,
                    password: this.encryptPassword(tempPassword)
                });
            }
            if (!user) {
                throw new Error('Erro criando usuário');
            }
            yield models_1.Token.destroy({
                where: {
                    userId: user.id
                }
            });
            const token = uuid_1.v4();
            yield models_1.Token.create({
                token: token,
                userId: user.id
            });
            return { id: user.id, name: user.name, token: token };
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map