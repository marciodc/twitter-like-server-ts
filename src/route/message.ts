import express from 'express'
import { MessageController } from '../controllers/messageController'

export class MessageRouter {
  public expressRouter: express.Router = express.Router()

  constructor() {
    const controller = new MessageController()
    this.initializeRoutes(controller)
  }

  public initializeRoutes(controller: MessageController): void {
    this.expressRouter
      .get('/:userId/following', controller.followingMessages)
      .get('/:userId/mostActive', controller.mostActive)
      .get('/:userId/publicUserMessage/:publicUserId', controller.publicUserMessages)
      .post('/:userId/new', controller.createMessage)
  }
}