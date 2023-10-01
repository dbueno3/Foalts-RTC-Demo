import 'source-map-support/register';
import * as http from 'http';

// 3p
import { Config, createApp, displayServerURL, ServiceManager } from '@foal/core';

// App
import { AppController } from './app/app.controller';
import { WebsocketService} from './app/services/websocket.service';

async function main() {
  const serviceManager = new ServiceManager();
  
  const app = await createApp(AppController, { serviceManager });

  const httpServer = http.createServer(app);
  // Instantiate, init and connect websocket controllers.
  await serviceManager.get(WebsocketService).attachHttpServer(httpServer);

  const port = Config.get('port', 'number', 3001);
  httpServer.listen(port, () => displayServerURL(port));
}

main()
  .catch(err => { console.error(err.stack); process.exit(1); });
