import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
// typeorm
import '../../database/typeorm/polyfill';
// controller
import { AppController } from './controller/app.controller';
// service
import { AppService } from './service/app.service';
import { TypeOrmConfigService } from '../../database/typeorm.service';
// helper
import { getEnvPath } from '../../common/helper/env.helper';
// decorator
import { IdExists } from '../../common/lib/decorator/exist.decorator';
import { Unique } from '../../common/lib/decorator/unique.decorator';

const envFilePath: string = getEnvPath(`${__dirname}/../../common/envs`);

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, IdExists, Unique],
  exports: [],
})
export class AppModule {}
