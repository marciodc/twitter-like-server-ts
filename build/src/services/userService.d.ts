import { ILogin } from "../interfaces/login";
import { IUser } from "../interfaces";
export declare class UserService {
    login(data: ILogin): Promise<{
        id: string;
        name: string;
        token: any;
    }>;
    signup(data: IUser): Promise<{
        id: string;
        name: string;
        token: string;
    }>;
    searchUser(userId: string, nome: string): Promise<object[]>;
    loginGoogle(gtoken: string): Promise<{
        id: string;
        name: string;
        token: any;
    }>;
    loginFacebook(ftoken: string): Promise<{
        id: string;
        name: string;
        token: any;
    }>;
    private verifyUser;
    encryptPassword: (password: string) => string;
}
//# sourceMappingURL=userService.d.ts.map