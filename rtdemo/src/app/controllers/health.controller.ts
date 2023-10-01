import { Context, Get, HttpResponseOK, HttpResponseInternalServerError } from '@foal/core';
//import { HealthIndicator, ResourceHealth } from '../entities/health-indicator';

export abstract class HealthIndicator {
    abstract name: string;
    status: ResourceHealth = ResourceHealth.Unhealthy;
    details: string | undefined;
  
    abstract checkLiveness(ctx: Context);
    abstract checkReadiness(ctx: Context);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let StartupCompleted: boolean;

  // resource-health.enum.ts
  export enum ResourceHealth {
    Healthy = 'Healthy',
    Unhealthy = 'Unhealthy'
  }
 
export class HealthController extends HealthIndicator {
  name = 'HealthCheck Service';

  @Get('/ready')
  async checkReadiness(): Promise<HttpResponseOK<ResourceHealth> | HttpResponseInternalServerError<ResourceHealth>>  {
    try {
      this.status = globalThis.StartupCompleted ? ResourceHealth.Healthy : ResourceHealth.Unhealthy;
      if (globalThis.StartupCompleted) 
      {
        return new HttpResponseOK(ResourceHealth.Healthy);
      } 
      else 
      {
        return new HttpResponseInternalServerError(ResourceHealth.Unhealthy);
      }
    } catch (e) {
      this.status = ResourceHealth.Unhealthy;
     return new HttpResponseInternalServerError(ResourceHealth.Unhealthy);
    }
  }

  @Get('/live')
  async checkLiveness(): Promise<HttpResponseOK<ResourceHealth> | HttpResponseInternalServerError<ResourceHealth>> {
    try {
      this.status = ResourceHealth.Healthy;
      return new HttpResponseOK(ResourceHealth.Healthy);
    } catch (e) {
      this.status = ResourceHealth.Unhealthy;
      return new HttpResponseInternalServerError(ResourceHealth.Unhealthy);
    }
  }
}
