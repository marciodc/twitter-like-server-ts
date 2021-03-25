import { NextFunction } from 'connect'
import { Request, Response } from 'express'
import { MessageService } from '../services/messageService'
import { formataErros } from '../utils'

export class MessageController {
  messageService: MessageService

  constructor () {
    this.messageService = new MessageService()
  }

  public createMessage = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      const { userId } = request.params
      const message = await this.messageService.createMessage(userId, request.body)
      response.status(200).json(message)
    } catch (error) {
      next(formataErros(response, error))
    }
  }

  public followingMessages = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      const { userId } = request.params
      const message = await this.messageService.followingMessages(userId)
      response.status(200).json(message)
    } catch (error) {
      next(formataErros(response, error))
    }
  }

  public mostActive = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      const { userId } = request.params
      const message = await this.messageService.mostActive(userId)
      response.status(200).json(message)
    } catch (error) {
      next(formataErros(response, error))
    }
  }

  public publicMessages = async (
    _request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      const message = await this.messageService.publicMessages()
      response.status(200).json(message)
    } catch (error) {
      next(formataErros(response, error))
    }
  }

  public publicUserMessages = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      const { userId, publicUserId } = request.params
      const message = await this.messageService.publicUserMessages(userId, publicUserId)
      response.status(200).json(message)
    } catch (error) {
      next(formataErros(response, error))
    }
  }

}
