"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("../models");
class Database {
    constructor() {
        this.init();
    }
    init() {
        this.connection = new sequelize_typescript_1.Sequelize({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            database: process.env.DB_NAME,
            dialect: 'postgres',
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            logging: msg => { console.log(msg); },
            define: {
                freezeTableName: true,
            },
        });
        this.connection.addModels([models_1.User, models_1.Message, models_1.Token, models_1.Following]);
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map