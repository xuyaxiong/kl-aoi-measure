import { Module } from '@nestjs/common';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';

@Module({
  imports: [],
  controllers: [MeasureController],
  providers: [MeasureService],
})
export class MeasureModule {}
