import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { UserService } from '../services/userService';
export declare class UserController {
    userService: UserService;
    constructor();
    login: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    signup: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    search: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    loginGoogle: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    loginFacebook: (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=userController.d.ts.map