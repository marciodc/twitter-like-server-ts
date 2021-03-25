"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const utils_1 = require("../utils");
const database_1 = require("../database/database");
const route_1 = require("../route");
require("../utils/dotenv");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.conn = new database_1.Database();
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
        this.app.disable('x-powered-by');
        this.app.use(morgan_1.default('tiny'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(function (req, res, next) {
            utils_1.validaToken(req, res, next);
        });
    }
    routes() {
        const userRouter = new route_1.UserRouter();
        const messageRouter = new route_1.MessageRouter();
        const publicRouter = new route_1.PublicRouter();
        const followingRouter = new route_1.FollowingRouter();
        this.app.use('/user', userRouter.expressRouter);
        this.app.use('/message', messageRouter.expressRouter);
        this.app.use('/public', publicRouter.expressRouter);
        this.app.use('/following', followingRouter.expressRouter);
    }
    start() {
        this.app.listen(4040, () => {
            utils_1.log.info(`Servidor iniciado na porta ${4040}.`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=startServer.js.map