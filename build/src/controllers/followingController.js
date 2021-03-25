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
exports.FollowingController = void 0;
const followingService_1 = require("../services/followingService");
const utils_1 = require("../utils");
class FollowingController {
    constructor() {
        this.follow = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, followUserId } = request.params;
                const following = yield this.followingService.follow(userId, followUserId);
                response.status(200).json(following);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.followingService = new followingService_1.FollowingService();
    }
}
exports.FollowingController = FollowingController;
//# sourceMappingURL=followingController.js.map