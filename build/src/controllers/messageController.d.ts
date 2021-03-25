import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { MessageService } from '../services/messageService';
export declare class MessageController {
    messageService: MessageService;
    constructor();
    createMessage: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    followingMessages: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    mostActive: (request: Request, response: Response, next: NextFunction) => Promise<void>;
    publicMessages: (_request: Request, response: Response, next: NextFunction) => Promise<void>;
    publicUserMessages: (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=messageController.d.ts.map