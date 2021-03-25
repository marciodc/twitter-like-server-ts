import { Model } from 'sequelize-typescript';
import { IFollowing } from '../interfaces/following';
export declare class Following extends Model implements IFollowing {
    id: string;
    userId: string;
    followUserId: string;
}
//# sourceMappingURL=following.d.ts.map