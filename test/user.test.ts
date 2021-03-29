import should from 'should'
import { UserService } from '../src/services/userService'
import { Database } from "../src/database"
import { QueryTypes } from "sequelize"

var userService: UserService

describe("User", function () {
  
  before(async () => {
    userService = new UserService() 
    const db = new Database
    await db.connection.query(`delete from public.users where email = 'user_teste@user.com'`, { bind: [], type: QueryTypes.SELECT })
  })

  it("Create new user", async () => {
    let user = {
      email: 'user_teste@user.com',
      name: 'User Teste',
      password: '123456'
    }

    const newUser = await userService.signup(user)
    should.exist(newUser.id)
  })

  it("Duplicated user", async () => {
    let user = {
      email: 'user_teste@user.com',
      name: 'User Teste',
      password: '123456'
    }

    try {
      await userService.signup(user)
    } catch (e) {
      should.equal(e['message'], 'SequelizeUniqueConstraintError: Validation error')
    }
  })

  it("Short name", async () => {
    let user = {
      email: 'user_teste@user.com',
      name: 'Us',
      password: '123456'
    }

    try {
      await userService.signup(user)
    } catch (e) {
      should.equal(e['message'], 'Error: Nome muito pequeno')
    }
  })

  it("Invalid email", async () => {
    let user = {
      email: 'user_teste',
      name: 'User Teste',
      password: '123456'
    }

    try {
      await userService.signup(user)
    } catch (e) {
      should.equal(e['message'], 'Error: Email inválido')
    }
  })

})