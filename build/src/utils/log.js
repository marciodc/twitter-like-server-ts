"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const winston_1 = require("winston");
const { combine, timestamp, prettyPrint } = winston_1.format;
exports.log = winston_1.createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new winston_1.transports.Console({
            level: 'debug'
        }),
        new winston_1.transports.File({ filename: './log/error-' + new Date().toISOString().slice(0, 10) + '.log', level: 'error' }),
        new winston_1.transports.File({ filename: './log/info-' + new Date().toISOString().slice(0, 10) + '.log', level: 'info' }),
    ],
    exitOnError: false
});
//# sourceMappingURL=log.js.map