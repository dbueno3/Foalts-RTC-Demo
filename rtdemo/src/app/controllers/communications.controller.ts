/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { dependency } from '@foal/core';
import { EventName, WebsocketContext, WebsocketResponse, WebsocketErrorResponse, WsServer, ValidatePayload } from '@foal/socket.io';


interface Message{ 
  
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;

}

interface User {
  id: string;
  isOnline: boolean;
  email?: string; // used for notifications
}

export class CommunicationsController {
  @dependency
  wsServer: WsServer;

  private messageStorage: Message[] = [];
  private  users: User[] = [];  

  echoPayloadSchema = {
    additionalProperties: false,
    properties: {
      eventName: {type: 'string', minLength: 1}    },
    required: ['eventName'],
    type: 'object'
  };



  @EventName('/echo')
  @ValidatePayload(controller => controller.echoPayloadSchema)
  async echo(ctx: WebsocketContext) {
    console.log(`${ctx.controllerName}.${ctx.controllerMethodName} - payload=${JSON.stringify(ctx.payload,null,2)}`);
    console.log(ctx.socket.id)
    console.log(ctx.payload)
    console.log(ctx.eventName)
    console.log(ctx.controllerName)
    console.log(ctx.controllerMethodName)
    console.log(ctx.socket.rooms)
    //console.log(ctx.socket.handshake)
    let payload = ctx.payload;
    if( !payload ) {
      payload = {eventName: '/communications/echo'};
    }
    ctx.socket.emit('/communications/echo', payload);
    this.messageStorage.push({
      senderId: ctx.socket.id,
      recipientId: ctx.socket.id,
      content: payload.eventName,
      timestamp: new Date()
    });
    console.log(this.messageStorage)

    return new WebsocketResponse();
  }

    // Updating user's online status
  @EventName('/update-status')
  async updateStatus(ctx: WebsocketContext) {
    const { isOnline } = ctx.payload;
    const user = this.users.find(u => u.id === ctx.socket.id);
    if (user) user.isOnline = isOnline;
    
    return new WebsocketResponse();
  }

  @EventName('get-messages')
  async getMessages(ctx: WebsocketContext) {
    // Extract the user's ID and the target recipient ID to fetch the messsage history 
    const userID = ctx.socket.id;
    const recipientID = ctx.payload;

    const messages = this.messageStorage.filter(
      msg => (msg.senderId === userID && msg.recipientId === recipientID) ||
              (msg.senderId === recipientID && msg.recipientId === userID)
    )
    
    ctx.socket.emit('get-messages', messages); 
  }

  @EventName('/join-room')
  async joinRoom(ctx: WebsocketContext) {
    const roomName = ctx.payload.roomName;
    ctx.socket.join(roomName);
    console.log(`Socket ${ctx.socket.id} joined room ${roomName}`);
    // Optionally notify others in the room
    ctx.socket.to(roomName).emit('user-joined', { user: ctx.socket.id, message: 'has joined the room.' });
    return new WebsocketResponse();
  }

  @EventName('/send-custom-event')
  async customEventHandler(ctx: WebsocketContext) {
    const payload = ctx.payload;
    const { targetEventName, message, room } = payload;

    // Validation and security checks for targetEventName, message, and room...
    ctx.socket.to(room).emit(targetEventName, { message });
    
    return new WebsocketResponse();
  }


  sendMessagePayloadSchemaV2 = {
    additionalProperties: false,
    properties: {
      eventName: { type: 'string', minLength: 1 },
      message: { type: 'string', minLength: 1 },
      recipientId: { type: 'string', minLength: 1 }  // Intended recipient
    },
    required: ['eventName', 'message', 'recipientId'],
    type: 'object'
  };
  
  @EventName('/send-direct')
  @ValidatePayload(controller => controller.sendMessagePayloadSchema)
  async sendDirectMessage(ctx: WebsocketContext) {
    // ... [rest of your method]

    // Storing the message
    this.messageStorage.push({
      senderId: ctx.socket.id,
      recipientId: ctx.payload.recipientId,
      content: ctx.payload.message,
      timestamp: new Date()
    });

    // Emit the message to the recipient
    ctx.socket.to(ctx.payload.recipientId).emit('/communications/receive-direct', ctx.payload);

    // Check if recipient is offline and send a notification
    const recipient = this.users.find(u => u.id === ctx.payload.recipientId);
    if (recipient && !recipient.isOnline) {
      // Send notification - this might be an email, SMS, or push notification
      // For example purposes, console log is used here. In real scenarios, use appropriate notification mechanisms.
      console.log(`User ${recipient.id} is offline. Sending notification to ${recipient.email}`);
    }
    
    return new WebsocketResponse();
  }

  @EventName('/confrim-reciptent')
  async confirmRecipient(ctx: WebsocketContext) {
    const {senderID, messgage} = ctx.payload;
    ctx.socket.to(senderID).emit('/communications/confirm-reciptent', {message: 'Message received'});
  }

}



  // sendMessagePayloadSchema = {
  //   additionalProperties: false,
  //   properties: {
  //     eventName: {type: 'string', minLength: 1},
  //     message: {type: 'string', minLength: 1},
  //     room: {type: 'string', minLength: 1}
  //   },
  //   required: ['eventName', 'message', 'room'],
  //   type: 'object'
  // };

  // @EventName('/send')
  // @ValidatePayload(controller => controller.sendMessagePayloadSchema)
  // async sendMessage(ctx: WebsocketContext) {
  //   console.log(`${ctx.controllerName}.${ctx.controllerMethodName} - payload=${JSON.stringify(ctx.payload,null,2)}`);
  //   console.log(ctx.socket.id)
  //   console.log(ctx.payload)
  //   console.log(ctx.eventName)
  //   console.log('This is the room', ctx.socket.rooms)
  //   let payload = ctx.payload;
  //   if( !payload ) {
  //     payload = {eventName: '/communications/send', message: ''};
  //   }

  //   // Extract the room name from the payload
  //   const {roomName, masssage} = payload
  //   console.log('This is the room', roomName)
  //   console.log('This is the message', masssage)

  //   //Emitting message only to sockets connecected to the room
  //   ctx.socket.to(roomName).emit('/communications/send', payload);

  //   return new WebsocketResponse();
  // }

