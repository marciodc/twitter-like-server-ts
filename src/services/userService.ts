import { compareSync } from "bcrypt"
import { ILogin } from "../interfaces/login"
import { IUser } from "../interfaces"
import { Token, User } from "../models"
import { Database } from "../database"
import { QueryTypes } from "sequelize"
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { OAuth2Client } from 'google-auth-library'
const nodeFbLogin = require('node-fb-login')

export class UserService {

  public async login(data: ILogin) {
    try {
      const user = await User.findOne({ where: {
          email: data.email
        }
      })

      if (!user) {
        throw new Error ('Usuário ou senha inválido')
      }

      const result = compareSync(data.password, user.password)

      if (!user || !result) {
        throw new Error ('Usuário ou senha inválido')
      }

      await Token.destroy({
        where: {
          userId: user.id
        }
      })

      const token = v4()
      await Token.create({
        token: token,
        userId: user.id
      })

      return {id: user.id, name: user.name, token: token}
    } catch (e) {
      throw new Error (e)
    }
  }

  public async signup(data: IUser) {
    try {
      if (data.name.length < 3) throw new Error ('Nome muito pequeno')
      if (!this.validateEmail(data.email)) throw new Error ('Email inválido')
      if (data.password.length < 6) throw new Error ('Senha muito pequena')

      let user = await User.create({
        name: data.name,
        email: data.email,
        password: this.encryptPassword(data.password)
      })
    
      const token = v4()
      const newToken = await Token.create({
        token: token,
        userId: user.id
      })

      return {id: user.id, name: user.name, token: newToken.token}
    } catch (e) {
      throw new Error (e)
    }
  }

  public async searchUser(userId: string, nome: string) {
    const db = new Database
    try {
      return await db.connection.query(`
          select u.id, u."name", 
          case
          when f.user_id = $1 then true
          else
          false
          end
          as following
          from users u
          left join following f on f.follow_user_id = u.id 
          where upper(u.name) ilike $2
        `, { bind: [userId, nome.toUpperCase() + '%'], type: QueryTypes.SELECT });
    } catch (e) {
      throw new Error (e)
    } finally {
      db.connection.close;
    }
  }

  public async loginGoogle(gtoken: string) {
    try {
      const client = new OAuth2Client(process.env.CLIENT_ID)
      const ticket = await client.verifyIdToken({
          idToken: gtoken,
          audience: process.env.GOOGLE_ID
      });
      const { name, email } = ticket.getPayload()

      return this.verifyUser(name, email)
    } catch (e) {
      throw new Error (e)
    }
  }

  public async loginFacebook(ftoken: string) {
    try {
      const { name, email } = await nodeFbLogin.getUserProfile({
        accessToken: ftoken,
        fields: ["name", "email"]
      })

      return this.verifyUser(name, email)
    } catch (e) {
      throw new Error (e)
    }
  }

  private async verifyUser(name: string, email: string) {
      let user = await User.findOne({ where: {
        email: email
      }
    })

    if (!user) {
      const tempPassword = v4()
      user = await User.create({
        name: name,
        email: email,
        password: this.encryptPassword(tempPassword)
      })
    }

    if (!user) {
      throw new Error ('Erro criando usuário')
    }

    await Token.destroy({
      where: {
        userId: user.id
      }
    })

    const token = v4()
    await Token.create({
      token: token,
      userId: user.id
    })

    return {id: user.id, name: user.name, token: token}
  }

  public encryptPassword = function (password: string): string {
    return bcrypt.hashSync(password, 10)
  }

  public validateEmail(str: string) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return pattern.test(str)
  }

}