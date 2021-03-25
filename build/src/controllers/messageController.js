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
exports.MessageController = void 0;
const messageService_1 = require("../services/messageService");
const utils_1 = require("../utils");
class MessageController {
    constructor() {
        this.createMessage = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = request.params;
                const message = yield this.messageService.createMessage(userId, request.body);
                response.status(200).json(message);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.followingMessages = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = request.params;
                const message = yield this.messageService.followingMessages(userId);
                response.status(200).json(message);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.mostActive = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = request.params;
                const message = yield this.messageService.mostActive(userId);
                response.status(200).json(message);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.publicMessages = (_request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.messageService.publicMessages();
                response.status(200).json(message);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.publicUserMessages = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, publicUserId } = request.params;
                const message = yield this.messageService.publicUserMessages(userId, publicUserId);
                response.status(200).json(message);
            }
            catch (error) {
                next(utils_1.formataErros(response, error));
            }
        });
        this.messageService = new messageService_1.MessageService();
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=messageController.js.map