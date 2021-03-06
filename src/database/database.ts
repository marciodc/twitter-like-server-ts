import {Sequelize} from 'sequelize-typescript'
import { User, Message, Token, Following } from '../models'

export class Database {
  public connection: Sequelize

  constructor() {
    this.init()
  }

  init(): void {
    if (process.env.DB_HOST == 'localhost') {
      this.connection = new Sequelize({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME,
        dialect: 'postgres',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: msg => { console.log(msg) },
        define: {
          freezeTableName: true,
        }
      })

      this.connection.addModels([User, Message, Token, Following])
    } else {
      this.connection = new Sequelize({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME,
        dialect: 'postgres',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: msg => { console.log(msg) },
        define: {
          freezeTableName: true,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      })
  
      this.connection.addModels([User, Message, Token, Following])
    }
  }
}
