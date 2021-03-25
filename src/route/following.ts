import express from 'express'
import { FollowingController } from '../controllers/followingController'

export class FollowingRouter {
  public expressRouter: express.Router = express.Router()

  constructor() {
    const controller = new FollowingController()
    this.initializeRoutes(controller)
  }

  public initializeRoutes(controller: FollowingController): void {
    this.expressRouter
      .post('/:userId/follow/:followUserId', controller.follow)
  }
}