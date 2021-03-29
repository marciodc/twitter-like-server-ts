import { NextFunction } from 'connect'
import { Request, Response } from 'express'
import { UserService } from '../services/userService'
import { formataErros } from '../utils'

export class UserController {
  userService: UserService

  constructor () {
    this.userService = new UserService()
  }

  public login = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      const login = await this.userService.login(request.body)
      response.status(200).json(login)
    } catch (error) {
      next(formataErros(response, error))
    }
  }

  public signup = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      
      const login = await this.userService.signup(request.body)
      response.status(200).json(login)
    } catch (error) {
      next(formataErros(response, error))
    }
  }

  public search = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      const { userId } = request.params
      const name = request.query.name != 'null' ? String(request.query.name): null
      const login = await this.userService.searchUser(userId, name)
      response.status(200).json(login)
    } catch (error) {
      next(formataErros(response, error))
    }
  }

  public loginGoogle = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      const { token }  = request.body
      const login = await this.userService.loginGoogle(token)
      response.status(200).json(login)
    } catch (error) {
      next(formataErros(response, error))
    }
  }

  public loginFacebook = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      const { token }  = request.body
      const login = await this.userService.loginFacebook(token)
      response.status(200).json(login)
    } catch (error) {
      next(formataErros(response, error))
    }
  }


}
