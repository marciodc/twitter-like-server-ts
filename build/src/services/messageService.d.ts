import { IMessage } from "../interfaces";
import { Message } from "../models";
export declare class MessageService {
    createMessage(userId: string, data: IMessage): Promise<Message>;
    followingMessages(userId: string): Promise<object[]>;
    mostActive(userId: string): Promise<object[]>;
    publicMessages(): Promise<Message[]>;
    publicUserMessages(userId: string, publicUserId: string): Promise<{
        user: object;
        messages: Message[];
    } | {
        user?: undefined;
        messages?: undefined;
    }>;
}
//# sourceMappingURL=messageService.d.ts.map