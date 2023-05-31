import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
// locals
import { AppService } from '../service/app.service';

@ApiTags('default')
@Controller({ path: '/greeting', version: ['1'] })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
