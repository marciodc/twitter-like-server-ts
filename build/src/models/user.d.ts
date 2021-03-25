import { Model } from 'sequelize-typescript';
import { IUser } from '../interfaces';
import { Message } from './message';
export declare class User extends Model implements IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    messages: Message[];
}
//# sourceMappingURL=user.d.ts.map