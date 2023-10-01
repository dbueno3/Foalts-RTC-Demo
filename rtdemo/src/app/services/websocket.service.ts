import { SocketIOController, WebsocketContext, wsController } from '@foal/socket.io';

import { CommunicationsController } from '../controllers';

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

        // If the user wants to disconnect from the server: 
        // Call socket.clost('disconnect', 'reason') and return.
        ctx.socket.on('disconnect', function() {
            console.log(`${new Date().toISOString()} onDisconnection`)
        });
    }
    

}
