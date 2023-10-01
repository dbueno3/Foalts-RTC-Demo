// std
import { notEqual } from 'assert';

// 3p
import { createController } from '@foal/core';

// App
import { ApiController } from './api.controller';

describe('ApiController', () => {

  it('should be able to create the controller', () => {
    // Instantiate the controller and make sure its not NULL
    const controller = createController(ApiController);
    notEqual(controller, null);
  });
});
