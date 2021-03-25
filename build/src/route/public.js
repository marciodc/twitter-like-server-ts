"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRouter = void 0;
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
class PublicRouter {
    constructor() {
        this.expressRouter = express_1.default.Router();
        const controller = new messageController_1.MessageController();
        this.initializeRoutes(controller);
    }
    initializeRoutes(controller) {
        this.expressRouter
            .get('/', controller.publicMessages);
    }
}
exports.PublicRouter = PublicRouter;
//# sourceMappingURL=public.js.map