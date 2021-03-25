import { createLogger, format, transports } from 'winston'

const { combine, timestamp , prettyPrint } = format

export const log = createLogger({
  format: combine(
        timestamp(),
        prettyPrint(),
      ),
  transports: [
    new transports.Console({
        level: 'debug'
    }),
    new transports.File({ filename: './log/error-' + new Date().toISOString().slice(0,10) + '.log' , level: 'error'  }),
    new transports.File({ filename: './log/info-' + new Date().toISOString().slice(0,10) + '.log' , level: 'info'  }),
  ],
  exitOnError: false
})
