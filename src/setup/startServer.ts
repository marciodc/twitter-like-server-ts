import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import { log, validaToken } from '../utils'
import { Database } from '../database/database'
// Rotas
import { UserRouter, MessageRouter, PublicRouter, FollowingRouter } from '../route'
import '../utils/dotenv'
import { SocketServer } from '../socket/socketServer'

export class StartServer {
  public app: Application
  public conn: Database
  private socketServer: typeof SocketServer

  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  public config(): void {
    this.conn = new Database()

    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(cors())
    this.app.disable('x-powered-by')
    this.app.use(morgan('tiny'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: false}))
    this.app.use(function(req, res, next) {
      validaToken(req, res, next)
    })
  }

  public routes(): void {
    const userRouter = new UserRouter()
    const messageRouter = new MessageRouter()
    const publicRouter = new PublicRouter()
    const followingRouter = new FollowingRouter()
    this.app.use('/user', userRouter.expressRouter)
    this.app.use('/message', messageRouter.expressRouter)
    this.app.use('/public', publicRouter.expressRouter)
    this.app.use('/following', followingRouter.expressRouter)
  }

  public start(): void {
    const port = process.env.PORT
    const server = this.app.listen(port, () => {
      log.info(`Servidor iniciado na porta ${ port }.`)
    })

    this.socketServer = SocketServer
    this.socketServer.createServer(server)
  }
}
