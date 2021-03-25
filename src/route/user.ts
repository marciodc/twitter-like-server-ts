import express from 'express'
import { UserController } from '../controllers/userController'

export class UserRouter {
  public expressRouter: express.Router = express.Router()

  constructor() {
    const controller = new UserController()
    this.initializeRoutes(controller)
  }

  public initializeRoutes(controller: UserController): void {
    this.expressRouter
      .get('/:userId/search', controller.search)
      .post('/login', controller.login)
      .post('/signup', controller.signup)
      .post('/login/google', controller.loginGoogle)
      .post('/login/facebook', controller.loginFacebook)
  }
}