/*

import { dependency } from '@foal/core';
import { EventName, WebsocketContext, WebsocketResponse, WebsocketErrorResponse, WsServer, ValidatePayload } from '@foal/socket.io';

export class CommunicationsController {
  @dependency
  wsServer: WsServer;

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
      message: {type: 'string', minLength: 1}
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
    if( !payload ) {
      payload = {eventName: '/communications/send'};
    }
    ctx.socket.broadcast.emit('/communications/send', {message: payload.message}, ctx.socket.id)
    return new WebsocketResponse();
  }
}
  */