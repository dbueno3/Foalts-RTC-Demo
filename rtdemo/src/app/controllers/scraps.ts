
// //   // @EventName('/broadcast')
// //   // @ValidatePayload(controller => controller.sendMessagePayloadSchema)
// //   // async broadcastMessage(ctx: WebsocketContext) {
// //   //   console.log(`${ctx.controllerName}.${ctx.controllerMethodName} - payload=${JSON.stringify(ctx.payload,null,2)}`);
// //   //   console.log(ctx.socket.id)
// //   //   console.log(ctx.payload)
// //   //   console.log(ctx.eventName)
  
// //   //   let payload = ctx.payload;
// //   //   if( !payload ) {
// //   //     payload = {eventName: '/communications/broadcast', message: ''};
// //   //   }
// //   //   const {message} = payload
// //   //   console.log('This is the message', message)

// //   //   // Emitting message to all connected sockets
// //   //   this.wsServer.io.emit('/communications/broadcast', payload);

// //   //   return new WebsocketResponse();
// //   // }

// //   // sendMessagePayloadSchema = {
// //   //   additionalProperties: false,
// //   //   properties: {
// //   //     eventName: {type: 'string', minLength: 1},
// //   //     message: {type: 'string', minLength: 1},
// //   //     room: {type: 'string', minLength: 1}
// //   //   },
// //   //   required: ['eventName', 'message', 'room'],
// //   //   type: 'object'
// //   // };

// //   // @EventName('/send')
// //   // @ValidatePayload(controller => controller.sendMessagePayloadSchema)
// //   // async sendMessage(ctx: WebsocketContext) {
// //   //   console.log(`${ctx.controllerName}.${ctx.controllerMethodName} - payload=${JSON.stringify(ctx.payload,null,2)}`);
// //   //   console.log(ctx.socket.id)
// //   //   console.log(ctx.payload)
// //   //   console.log(ctx.eventName)
// //   //   console.log('This is the room', ctx.socket.rooms)
// //   //   let payload = ctx.payload;
// //   //   if( !payload ) {
// //   //     payload = {eventName: '/communications/send', message: ''};
// //   //   }

// //   //   // Extract the room name from the payload
// //   //   const {roomName, masssage} = payload
// //   //   console.log('This is the room', roomName)
// //   //   console.log('This is the message', masssage)

// //   //   //Emitting message only to sockets connecected to the room
// //   //   ctx.socket.to(roomName).emit('/communications/send', payload);

// //   //   return new WebsocketResponse();
// //   // }

// // /* TODO BACKUP BACKEND CODE IF SHIT GOES TO BED  */

// // /* eslint-disable @typescript-eslint/restrict-template-expressions */
// // import { dependency } from '@foal/core';
// // import { EventName, WebsocketContext, WebsocketResponse, WebsocketErrorResponse, WsServer, ValidatePayload } from '@foal/socket.io';

// // export class CommunicationsController {
// //   @dependency
// //   wsServer: WsServer;

// //   messagePayloadSchema = {
// //     additionalProperties: false,
// //     properties: {
// //       eventName: {type: 'string', minLength: 1},
// //       message: {type: 'string', minLength: 1},
// //       room: {type: 'string', minLength: 1}
// //     },
// //     required: ['eventName','message','room'],
// //     type: 'object'
// //   };

// //   echoPayloadSchema = {
// //     additionalProperties: false,
// //     properties: {
// //       eventName: {type: 'string', minLength: 1}    },
// //     required: ['eventName'],
// //     type: 'object'
// //   };

// //   @EventName('/echo')
// //   @ValidatePayload(controller => controller.echoPayloadSchema)
// //   async echo(ctx: WebsocketContext) {
// //     console.log(`${ctx.controllerName}.${ctx.controllerMethodName} - payload=${JSON.stringify(ctx.payload,null,2)}`);
// //     console.log(ctx.socket.id)
// //     console.log(ctx.payload)
// //     console.log(ctx.eventName)
// //     console.log(ctx.controllerName)
// //     console.log(ctx.controllerMethodName)
// //     console.log(ctx.socket.rooms)
// //     //console.log(ctx.socket.handshake)
// //     let payload = ctx.payload;
// //     if( !payload ) {
// //       payload = {eventName: '/communications/echo'};
// //     }
// //     ctx.socket.emit('/communications/echo', payload);

// //     return new WebsocketResponse();
// //   }

// //   sendMessagePayloadSchema = {
// //     additionalProperties: false,
// //     properties: {
// //       eventName: {type: 'string', minLength: 1},
// //       message: {type: 'string', minLength: 1},
// //       room: {type: 'string', minLength: 1}
// //     },
// //     required: ['eventName', 'message', 'room'],
// //     type: 'object'
// //   };

// //   @EventName('/send')
// //   @ValidatePayload(controller => controller.sendMessagePayloadSchema)
// //   async sendMessage(ctx: WebsocketContext) {
// //     console.log(`${ctx.controllerName}.${ctx.controllerMethodName} - payload=${JSON.stringify(ctx.payload,null,2)}`);
// //     console.log(ctx.socket.id)
// //     console.log(ctx.payload)
// //     console.log(ctx.eventName)
// //     console.log('This is the room', ctx.socket.rooms)
    
// //     let payload = ctx.payload;
// //     if( !payload ) {
// //       payload = {eventName: '/communications/send', message: '', room: ''};
// //     }

// //     const {room, message} = payload
// //     console.log('This is the room', room)
// //     console.log('This is the message', message)

// //     // Emitting message to all sockets connected to the room, including sender
// //     ctx.socket.to(room).emit('/communications/message', payload);
// //     ctx.socket.broadcast.emit('/communications/message', payload);
// //     this.wsServer.io.emit('/communications/message', payload);

// //     return new WebsocketResponse();
// //   }

// //   @EventName('/join-room')
// //   async joinRoom(ctx: WebsocketContext) {
// //     const roomName = ctx.payload.roomName;
// //     ctx.socket.join(roomName);
// //     console.log(`Socket ${ctx.socket.id} joined room ${roomName}`);
// //     // Optionally notify others in the room
// //     ctx.socket.to(roomName).emit('user-joined', { user: ctx.socket.id, message: 'has joined the room.' });
// //     return new WebsocketResponse();
// //   }

// //   @EventName('/send-custom-event')
// //   async customEventHandler(ctx: WebsocketContext) {
// //     const payload = ctx.payload;
// //     const { targetEventName, message, room } = payload;

// //     // Validation and security checks for targetEventName, message, and room...
// //     ctx.socket.to(room).emit(targetEventName, { message });
// //     return new WebsocketResponse();
// //   }

// //   // This is for debugging only -> Make sure they two users are in the same room or if they are in a gc
// //   @EventName('/display-roomname')
// //   async displayRoomName(ctx: WebsocketContext) {
// //     const roomName = ctx.payload.roomName;
// //     console.log(`Socket ${ctx.socket.id} is in room ${roomName}`);
// //     return new WebsocketResponse();
// //   }

// //   @EventName('/leave-room')
// //   async leaveRoom(ctx: WebsocketContext) {
// //     const roomName = ctx.payload.roomName;
// //     ctx.socket.leave(roomName);
// //     console.log(`Socket ${ctx.socket.id} left room ${roomName}`);
// //     ctx.socket.to(roomName).emit('user-left', { user: ctx.socket.id, message: 'has left the room.' });
// //     return new WebsocketResponse();
// //   } 

// //   @EventName('/send-private-message')
// //   async sendPrivateMessage(ctx: WebsocketContext) {
// //     const { recipientId, message } = ctx.payload;  
// //     // ... Save the message to database or process it as required ...
    
// //     // Notify the recipient
// //     this.wsServer.io.to(recipientId).emit('/notification', {
// //         message: `New message from ${ctx.socket.id}: ${message}`
// //     });
// //     return new WebsocketResponse();
// //   }

// //   @EventName('/leave-room')
// //   async leaveRoom(ctx: WebsocketContext) {
// //     const roomName = ctx.payload.roomName;
// //     ctx.socket.leave(roomName);
// //     console.log(`Socket ${ctx.socket.id} left room ${roomName}`);
// //     ctx.socket.to(roomName).emit('user-left', { user: ctx.socket.id, message: 'has left the room.' });
// //     return new WebsocketResponse();
// //   } 

// //   @EventName('/send-private-message')
// //   async sendPrivateMessage(ctx: WebsocketContext) {
// //     const { recipientId, message } = ctx.payload;  
// //     // ... Save the message to database or process it as required ...
    
// //     // Notify the recipient
// //     this.wsServer.io.to(recipientId).emit('/notification', {
// //         message: `New message from ${ctx.socket.id}: ${message}`
// //     });
// //     return new WebsocketResponse();
// //   }
// // }
// // /* 
// // import { dependency } from '@foal/core';
// // import { EventName, WebsocketContext, WebsocketResponse, WsServer, ValidatePayload } from '@foal/socket.io';

// // export class CommunicationsController {
// //   @dependency
// //   wsServer: WsServer;

// //   messagePayloadSchema = {
// //     additionalProperties: false,
// //     properties: {
// //       eventName: { type: 'string', minLength: 1 },
// //       message: { type: 'string', minLength: 1 },
// //       room: { type: 'string', minLength: 1 }
// //     },
// //     required: ['eventName', 'message', 'room'],
// //     type: 'object'
// //   };

// //   @EventName('/send')
// //   @ValidatePayload(controller => controller.messagePayloadSchema)
// //   async sendMessage(ctx: WebsocketContext) {
// //     const payload = ctx.payload;
// //     const { room, message } = payload;
// //     console.log(`[${room}] ${ctx.socket.id}: ${message}`);

// //     // Emitting message to all sockets connected to the room, excluding the sender
// //     ctx.socket.to(room).emit('/communications/message', payload);

// //     return new WebsocketResponse();
// //   }

// //   @EventName('/join-room')
// //   async joinRoom(ctx: WebsocketContext) {
// //     const roomName = ctx.payload.roomName;
// //     ctx.socket.join(roomName);
// //     console.log(`Socket ${ctx.socket.id} joined room ${roomName}`);

// //     // Notify others in the room
// //     ctx.socket.to(roomName).emit('user-joined', { user: ctx.socket.id, message: 'has joined the room.' });
    
// //     return new WebsocketResponse();
// //   }

// //   @EventName('/leave-room')
// //   async leaveRoom(ctx: WebsocketContext) {
// //     const roomName = ctx.payload.roomName;
// //     ctx.socket.leave(roomName);
// //     console.log(`Socket ${ctx.socket.id} left room ${roomName}`);

// //     // Notify others in the room
// //     ctx.socket.to(roomName).emit('user-left', { user: ctx.socket.id, message: 'has left the room.' });
    
// //     return new WebsocketResponse();
// //   } 

// //   @EventName('/send-private-message')
// //   async sendPrivateMessage(ctx: WebsocketContext) {
// //     const { recipientId, message } = ctx.payload;  
    
// //     // Notify the recipient
// //     this.wsServer.io.to(recipientId).emit('/notification', {
// //         message: `New message from ${ctx.socket.id}: ${message}`
// //     });
    
// //     return new WebsocketResponse();
// //   }
// // }


// @EventName('/message')
// @ValidatePayload(controller => controller.messagePayloadSchema)
// async broadcastmessage(ctx: WebsocketContext) {
//   const { message, room } = ctx.payload;
// //   console.log(`Broadcasting message: ${message} to room ${room}`);
// // }

// messagePayloadSchema = {
//     additionalProperties: false,
//     properties: {
//       eventName: {type: 'string', minLength: 1},
//       message: {type: 'string', minLength: 1},
//       room: {type: 'string', minLength: 1}
//     },
//     required: ['eventName','message','room'],
//     type: 'object'
//   };
// // // */




  // @EventName('/typing')
  // async typing(ctx: WebsocketContext) {
  //     const { userName } = ctx.payload;
  //     const message = `${userName} is typing...`;
  //     this.wsServer.io.emit('/communications/typingResponse', message);
  //     return new WebsocketResponse();
  
  

  // @EventName('/new-user')
  // async newUser(ctx: WebsocketContext) {
  //     const { userName } = ctx.payload;
  //     // The user management logic should handle adding the new user and then retrieving all users
  //     this.userManagement.addUser(ctx.socket.id, userName); 
  //     const allUsers = this.userManagement.getUser();
  //     this.wsServer.io.emit('/communications/newUserResponse', allUsers);
  //     return new WebsocketResponse();
  // }

  // @EventName('/join-room')
  // async joinRoom(ctx: WebsocketContext) {
  //   const roomName = ctx.payload.roomName;
  //   ctx.socket.join(roomName);
  //   this.userManagement.addUser(ctx.socket.id, {});
  //   console.log(`Socket ${ctx.socket.id} joined room ${roomName}`);
  //   return new WebsocketResponse();
  // }

