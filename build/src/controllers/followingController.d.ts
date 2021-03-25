import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { FollowingService } from '../services/followingService';
export declare class FollowingController {
    followingService: FollowingService;
    constructor();
    follow: (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=followingController.d.ts.map