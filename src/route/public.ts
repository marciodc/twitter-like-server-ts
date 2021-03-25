import express from 'express'
import { MessageController } from '../controllers/messageController'

export class PublicRouter {
  public expressRouter: express.Router = express.Router()

  constructor() {
    const controller = new MessageController()
    this.initializeRoutes(controller)
  }

  public initializeRoutes(controller: MessageController): void {
    this.expressRouter
      .get('/', controller.publicMessages)
  }
}