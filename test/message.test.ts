import should from 'should'
import { MessageService } from '../src/services/messageService'
import { UserService } from '../src/services/userService'
import { FollowingService } from '../src/services/followingService'
import { Database } from "../src/database"
import { QueryTypes } from "sequelize"

var messageService: MessageService
var userService: UserService
var followingService: FollowingService
var user: any
var db: any

describe("User", function () {
  
  before(async () => {
    messageService = new MessageService() 
    userService = new UserService()
    followingService = new FollowingService()

    db = new Database
    await db.connection.query(`delete from public.users where email = 'user_teste@user.com'`, { bind: [], type: QueryTypes.SELECT })

    const usr = {
      email: 'user_teste@user.com',
      name: 'User',
      password: '1234567'
    }

    user = await userService.signup(usr)
  })

  after(async () => {
    db.connection.close
  })

  it("Create public message", async () => {
    let msg = {
      userId: user.id,
      text: 'Mensagem de Teste #0000001',
      dateTime: new Date(),
      public: true,
      color: 2
    }

    const newMessage = await messageService.createMessage(user.id, msg)
    should.exist(newMessage.id)
  })

  it("Check public message", async () => {
    const newMessage = await messageService.publicMessages()
    should.equal(newMessage[0].text, 'Mensagem de Teste #0000001')
  })

  it("Create private message", async () => {
    await db.connection.query(`delete from public.message where user_id = $1`, { bind: [user.id], type: QueryTypes.SELECT })

    let msg = {
      userId: user.id,
      text: 'Mensagem de Teste #0000002',
      dateTime: new Date(),
      public: false,
      color: 2
    }

    const newMessage = await messageService.createMessage(user.id, msg)
    should.exist(newMessage.id)
  })

  it("Check private message", async () => {
    const newMessage = await messageService.followingMessages(user.id)
    should.equal(newMessage[0]['text'], 'Mensagem de Teste #0000002')
    should.equal(newMessage[0]['public'], false)
  })  

  it("Follow user", async () => {
    await db.connection.query(`delete from public.users where email = 'user2_teste@user.com'`, { bind: [], type: QueryTypes.SELECT })

    let usr = {
      email: 'user2_teste@user.com',
      name: 'User2',
      password: '1234567'
    }

    const newUser = await userService.signup(usr)

    let msg = {
      userId: newUser.id,
      text: 'Mensagem de Teste #0000003',
      dateTime: new Date(),
      public: false,
      color: 2
    }

    await messageService.createMessage(newUser.id, msg)

    await followingService.follow(user.id, newUser.id)

    const messages = await messageService.followingMessages(user.id)
    var members = messages.filter(item => {
      return item['text'] === 'Mensagem de Teste #0000003'
    })

    should.equal(members[0]['text'], 'Mensagem de Teste #0000003')
  })

})