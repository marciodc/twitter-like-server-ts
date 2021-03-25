import { Following } from "../models";

export class FollowingService {

  public async follow(userId: String, followUserId: string) {
    try {
      return await Following.create({
        userId: userId,
        followUserId: followUserId
      })
    } catch (e) {
      throw new Error (e)
    }
  }

}