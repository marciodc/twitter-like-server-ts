import { Model } from 'sequelize-typescript';
import { IMessage } from '../interfaces';
import { User } from './user';
export declare class Message extends Model implements IMessage {
    id: string;
    userId: string;
    text: string;
    dateTime: Date;
    public: Boolean;
    color: number;
    user: User;
}
//# sourceMappingURL=message.d.ts.map