import { NextFunction } from 'connect'
import { Request, Response } from 'express'
import { FollowingService } from '../services/followingService'
import { formataErros } from '../utils'

export class FollowingController {
  followingService: FollowingService

  constructor () {
    this.followingService = new FollowingService()
  }

  public follow = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<void> => {
    try {
      const { userId, followUserId } = request.params
      const following = await this.followingService.follow(userId, followUserId)
      response.status(200).json(following)
    } catch (error) {
      next(formataErros(response, error))
    }
  }

}
