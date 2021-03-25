"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowingRouter = void 0;
const express_1 = __importDefault(require("express"));
const followingController_1 = require("../controllers/followingController");
class FollowingRouter {
    constructor() {
        this.expressRouter = express_1.default.Router();
        const controller = new followingController_1.FollowingController();
        this.initializeRoutes(controller);
    }
    initializeRoutes(controller) {
        this.expressRouter
            .post('/:userId/follow/:followUserId', controller.follow);
    }
}
exports.FollowingRouter = FollowingRouter;
//# sourceMappingURL=following.js.map