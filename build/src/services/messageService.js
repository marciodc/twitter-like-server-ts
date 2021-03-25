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
exports.MessageService = void 0;
const models_1 = require("../models");
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
class MessageService {
    createMessage(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.Message.create({
                    userId: userId,
                    text: data.text,
                    dateTime: new Date(),
                    public: data.public,
                    color: data.color
                });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    followingMessages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new database_1.Database;
            try {
                return yield db.connection.query(`
        select u.id, u.name, m."text", m.color, m.date_time
        from message m 
        inner join users u on u.id = m.user_id
        inner join following f on u.id = m.user_id 
        where f.user_id = $1 or m.user_id = $1
        group by 1, 2, 3, 4, 5
        order by m.date_time desc
      `, { bind: [userId], type: sequelize_1.QueryTypes.SELECT });
            }
            catch (e) {
                throw new Error(e);
            }
            finally {
                db.connection.close;
            }
        });
    }
    mostActive(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new database_1.Database;
            try {
                return yield db.connection.query(`
        select u.id, u."name", 
        case
        when f.follow_user_id is not null then true
        else
        false
        end
        as following 
        from message m 
        inner join users u on u.id = m.user_id
        left join following f on f.follow_user_id = u.id 
        where u.id <> $1
        group by 1, 2, 3
        order by count(m.id)
        limit 3
      `, { bind: [userId], type: sequelize_1.QueryTypes.SELECT });
            }
            catch (e) {
                throw new Error(e);
            }
            finally {
                db.connection.close;
            }
        });
    }
    publicMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield models_1.Message.findAll({
                    attributes: ['id', 'text', 'color'],
                    where: { public: true },
                    order: [
                        ['dateTime', 'DESC'],
                    ],
                    include: [
                        {
                            model: models_1.User,
                            attributes: ['name']
                        }
                    ],
                    limit: 10
                });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    publicUserMessages(userId, publicUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new database_1.Database;
            try {
                const users = yield db.connection.query(`
          select u.id, u."name", 
          case
          when f.user_id = $1 then true
          else
          false
          end
          as following 
          from users u
          left join following f on f.follow_user_id = u.id 
          where u.id = $2
        `, { bind: [userId, publicUserId], type: sequelize_1.QueryTypes.SELECT });
                if (users) {
                    const user = users[0];
                    let condition = {};
                    if (!user['following']) {
                        condition = {
                            public: true
                        };
                    }
                    let messages = yield models_1.Message.findAll({
                        attributes: ['id', 'text', 'color'],
                        where: condition,
                        order: [
                            ['dateTime', 'DESC'],
                        ],
                        include: [
                            {
                                model: models_1.User,
                                attributes: ['name'],
                                where: {
                                    id: publicUserId
                                }
                            }
                        ],
                    });
                    return {
                        user: user,
                        messages: messages
                    };
                }
                else {
                    return {};
                }
            }
            catch (e) {
                throw new Error(e);
            }
            finally {
                db.connection.close;
            }
        });
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=messageService.js.map