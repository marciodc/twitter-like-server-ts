import { Application } from 'express';
import { Database } from '../database/database';
import '../utils/dotenv';
export declare class Server {
    app: Application;
    conn: Database;
    constructor();
    config(): void;
    routes(): void;
    start(): void;
}
//# sourceMappingURL=startServer.d.ts.map