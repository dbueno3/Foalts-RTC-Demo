// 3p
import { Config, createApp, displayServerURL, ServiceManager } from '@foal/core';
// import * as request from 'supertest';
import * as http from 'http';

// App
import { AppController } from '../app/app.controller';
import { WebsocketService } from '../app/services/websocket.service';

// Notes for developers:
// src/e2e.ts sets NODE_ENV=e2e, which will load Config settings from config/e2e.json
// therefore any config values should be updated under config/e2e.json

describe('The server', () => {

  let app;
  let serviceManager;
  let httpServer: http.Server;

  before(async () => {
    serviceManager = new ServiceManager();
    app = await createApp(AppController, { serviceManager });
    httpServer = http.createServer(app);

    // output some of the config info
    console.log(Config.get('redis'));
    console.log(Config.get('auth'));
    console.log(Config.get('api'));
    
    // connect websocket is commented out because this fails in azure devops
    //console.log('connecting to websocket');
    //await Promise.all([pubClient.connect(), subClient.connect()]);

    // Instantiate, init and connect websocket controllers.
    console.log('attaching websocket');
    await serviceManager.get(WebsocketService).attachHttpServer(httpServer);

    // may not need to run this http server.....
    const port = Config.get('port', 'number', 3002);
    console.log('starting httpserver');
    httpServer.listen(port, () => displayServerURL(port));
  });

  it('httpServer address setup properly', () => {
    return httpServer.address() === 'http://localhost:3003';
  });

});

