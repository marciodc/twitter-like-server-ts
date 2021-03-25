"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
class UserRouter {
    constructor() {
        this.expressRouter = express_1.default.Router();
        const controller = new userController_1.UserController();
        this.initializeRoutes(controller);
    }
    initializeRoutes(controller) {
        this.expressRouter
            .get('/:userId/search', controller.search)
            .post('/login', controller.login)
            .post('/signup', controller.signup)
            .post('/login/google', controller.loginGoogle)
            .post('/login/facebook', controller.loginFacebook);
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=user.js.map