/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { dependency } from '@foal/core';
import { EventName, WebsocketContext, WebsocketResponse, WebsocketErrorResponse, WsServer, ValidatePayload } from '@foal/socket.io';
import { UserManagementService } from '../services/user-management.service';

export class CommunicationsController {
  @dependency
  wsServer: WsServer;

  @dependency
  userManagement: UserManagementService

  echoPayloadSchema = {
    additionalProperties: false,
    properties: {
      eventName: {type: 'string', minLength: 1}    },
    required: ['eventName'],
    type: 'object'
  };

  sendMessageSchema = {
    additionalProperties: false,
    properties: {
      eventName: {type: 'string', minLength: 1},
      message: {type: 'string', minLength: 1},
    },
    required: ['eventName', 'message'],
    type: 'object'
  };

  @EventName('/echo')
  @ValidatePayload(controller => controller.echoPayloadSchema)
  async echo(ctx: WebsocketContext) {
    console.log(`${ctx.controllerName}.${ctx.controllerMethodName} - payload=${JSON.stringify(ctx.payload,null,2)}`);
    let payload = ctx.payload;
    if( !payload ) {
      payload = {eventName: '/communications/echo'};
    }
    ctx.socket.emit('/communications/echo', payload);
    return new WebsocketResponse();
  }
  
  @EventName('/send')
  @ValidatePayload(controller => controller.sendMessageSchema)
  async send(ctx: WebsocketContext) {
    console.log(`${ctx.controllerName}.${ctx.controllerMethodName} - payload=${JSON.stringify(ctx.payload,null,2)}`);
    console.log(`ctx.socket.id=${ctx.socket.id}`);
    console.log(`ctx.socket.rooms=${JSON.stringify(ctx.socket.rooms,null,2)}`);
    let payload = ctx.payload;
    if(!payload) { 
      payload = {eventName: '/communications/send'};
    }

    this.wsServer.io.emit('/communications/send', {
      message: payload.message
    });
    
    return new WebsocketResponse();
  }

  typingSchema = {
    additionalProperties: false,
    properties: {
      userName: {type: 'string', minLength: 1}
    },
    required: ['userName'],
    type: 'object'
  }

  @EventName('/typing')
  @ValidatePayload(controller => controller.typingSchema)
  async typing(ctx: WebsocketContext) {
    const { userName } = ctx.payload;
    const message = `${userName} is typing...`;
    this.wsServer.io.emit('/communications/typingResponse', message);
    return new WebsocketResponse();
  }

  newUserSchema = {
    additionalProperties: false,
    properties: {
      userName: {type: 'string', minLength: 1}
    },
    required: ['userName'],
    type: 'object'
  }
  @EventName('/newUser')
  @ValidatePayload(controller => controller.newUserSchema)
  async newUser(ctx: WebsocketContext) {
    const { userName } = ctx.payload;
    
    // The user management logic should handle adding the new user and then retrieving all users
    this.userManagement.addUser(ctx.socket.id, userName); 
    const allUsers = this.userManagement.getUser(ctx.socket.id);
    this.wsServer.io.emit('/communications/newUserResponse', allUsers);
    return new WebsocketResponse();
  }

  newUserResponseSchema = {
    additionalProperties: false,
    properties: {
      userName: {type: 'string', minLength: 1}
    },
    required: ['userName'],
    type: 'object'
  }

  @EventName('/newUserResponse')
  @ValidatePayload(controller => controller.newUserResponseSchema)
  async newUserResponse(ctx: WebsocketContext) {
    const { userName } = ctx.payload;
   // const allUsers = this.userManagement.getUser();
    this.wsServer.io.emit('/communications/newUserResponse', userName);
    return new WebsocketResponse();
  }

  @EventName('/userCount')
  async userCount(ctx: WebsocketContext) {
    const userCount = this.userManagement.getUserCount();
    this.wsServer.io.emit('/communications/userCount', userCount +1);
    return new WebsocketResponse(); 
  
  }

}

