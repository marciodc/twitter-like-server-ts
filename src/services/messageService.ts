import { IMessage } from "../interfaces";
import { Message, User } from "../models";
import { Database } from "../database"
import { QueryTypes } from "sequelize";
import { SocketServer } from "../socket/socketServer";

export class MessageService {

  private socketServer: typeof SocketServer

  constructor () {
    this.socketServer = SocketServer
  }

  public async createMessage(userId: string, data: IMessage) {
    try {
      const message = await Message.create({
        userId: userId,
        text: data.text,
        dateTime: new Date(),
        public: data.public,
        color: data.color
      })
      this.following(userId)
      return message
    } catch (e) {
      throw new Error (e)
    }
  }

  public async followingMessages(userId: string) {
    const db = new Database
    try {
      return await db.connection.query(`
        select u.id, u.name, m."text", m.color, m.date_time, m.public
        from message m 
        inner join users u on u.id = m.user_id
        inner join following f on u.id = m.user_id 
        where f.user_id = $1 or m.user_id = $1
        group by 1, 2, 3, 4, 5, 6
        order by m.date_time desc
      `, { bind: [userId], type: QueryTypes.SELECT });
    } catch (e) {
      throw new Error (e)
    } finally {
      db.connection.close;
    }
  }

  public async mostActive(userId: string) {
    const db = new Database
    try {
      return await db.connection.query(`
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
      `, { bind: [userId], type: QueryTypes.SELECT });
    } catch (e) {
      throw new Error (e)
    } finally {
      db.connection.close;
    }
  }

  public async publicMessages() {
    try {
      return await Message.findAll({
        attributes: ['id', 'text', 'color'],
        where: {public: true},
        order: [
          ['dateTime', 'DESC'],
        ],
        include: [
          {
            model: User,
            attributes: ['name']
          }
        ],
        limit: 10
      })
    } catch (e) {
      throw new Error (e)
    }
  }

  public async publicUserMessages(userId: string, publicUserId: string) {
    const db = new Database
    try {
      const users = await db.connection.query(`
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
        `, { bind: [userId, publicUserId], type: QueryTypes.SELECT });
      if (users) {
        const user = users[0]
        let condition = {}
        if (!user['following']) {
          condition = {
            public: true
          }
        }
        let messages = await Message.findAll({
          attributes: ['id', 'text', 'color'],
          where: condition,
          order: [
            ['dateTime', 'DESC'],
          ],
          include: [
            {
              model: User,
              attributes: ['name'],
              where: {
                id: publicUserId
              }
            }
          ],

        })

        return {
          user: user,
          messages: messages
        }
      } else {
        return {}
      }
    } catch (e) {
      throw new Error (e)
    } finally {
      db.connection.close;
    }
  }

  public async following(userId: string) {
    const db = new Database
    try {
      const users = await db.connection.query(`
        select user_id
        from following 
        where follow_user_id = $1
      `, { bind: [userId], type: QueryTypes.SELECT })

      users.forEach(user => {
        this.socketServer.sendMessage(user['user_id'])
      })
    } catch (e) {
      throw new Error (e)
    } finally {
      db.connection.close;
    }
  }

}