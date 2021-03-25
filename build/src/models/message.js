"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
let Message = class Message extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.ForeignKey(() => user_1.User),
    __metadata("design:type", String)
], Message.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Message.prototype, "dateTime", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Message.prototype, "public", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Message.prototype, "color", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => user_1.User),
    __metadata("design:type", user_1.User)
], Message.prototype, "user", void 0);
Message = __decorate([
    sequelize_typescript_1.Table({ tableName: 'message', underscored: true, timestamps: false })
], Message);
exports.Message = Message;
//# sourceMappingURL=message.js.map