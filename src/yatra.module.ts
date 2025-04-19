import { Module } from '@nestjs/common';

import { YatraController } from './controller/yatra.controller';
import { YatraService } from './service/yatra.service';
import { YatraTransformService } from './service/yatra.transform.service';

@Module({
  controllers: [YatraController],
  providers: [YatraTransformService,YatraService],
})
export class YatraModule {}
