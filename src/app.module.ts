import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YatraController } from './controller/yatra.controller';
import { YatraService } from './service/yatra.service';

@Module({
  imports: [],
  controllers: [AppController, YatraController],
  providers: [AppService, YatraService],
})
export class AppModule {}
