import { SocketIOController, WebsocketContext, wsController } from '@foal/socket.io';

import { CommunicationsController } from '../controllers';
import { UserManagementService } from '../services/user-management.service';

export class ConnectionErrorException extends Error {

    constructor(statusCode: number, message: string) {
        super(JSON.stringify({status: statusCode, message: message}));
    }
}

export class WebsocketService extends SocketIOController {

    subControllers = [
        wsController('/communications', CommunicationsController)
    ];

    constructor() {
        super();
        // ensure that our realtime server can accept websocket connections from any domain.
        this.options = {
            cors: {
                origin: '*'
            }
        }
    }

    createConnectionErrorException( status: number, message: string) {
        const jsonString = JSON.stringify({status: status, message: message});
        return jsonString;
    }

    async onConnection(ctx: WebsocketContext) {

        console.log(`${new Date().toISOString()} onConnection`);
       


        //const connectionContext = ctx;
        ctx.socket.on('disconnect', function() {
            console.log(`${new Date().toISOString()} onDisconnection`)
        });
    }

}
