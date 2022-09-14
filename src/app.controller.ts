import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return 'ok';
  }

  @Get('setup-ad')
  setupAd(@Query('code') code: string) {
    return this.appService.setupApp(code);
  }

  @Get('adminconsent/:clientId')
  login(@Param('clientId') clientId: string) {
    const href = this.appService.getLoginUrl(clientId);
    return `<a href="${href}" target="_blank">autorizar ${clientId}</a>`;
  }
}
