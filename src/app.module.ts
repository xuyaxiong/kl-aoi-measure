import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasureController } from './measure/measure.controller';
import { MeasureService } from './measure/measure.service';

@Module({
  imports: [],
  controllers: [AppController, MeasureController],
  providers: [AppService, MeasureService],
})
export class AppModule {}
