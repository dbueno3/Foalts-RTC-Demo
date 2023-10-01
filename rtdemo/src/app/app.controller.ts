import { render, controller, IAppController, Get, Context, Hook } from '@foal/core';

import { ApiController, HealthController } from './controllers';

@Hook(() => response => {
  // Every response of this controller and its sub-controllers will be added this header.
  response.setHeader('Access-Control-Allow-Origin', '*');
})
export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/healthz', HealthController)
  ];

  @Get('/')
  async index(ctx: Context) {
   return await render('templates/index.html', {}, __dirname)
  }

  @Get('/remote-device')
  async remoteDevice(ctx: Context) {
    return await render('templates/remote-device.html', {}, __dirname)
  }
}
