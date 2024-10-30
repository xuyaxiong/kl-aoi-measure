import { Controller, Get, Post, Body } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureParam } from './measure.param';

@Controller('measure')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @Post('measure')
  measure(@Body() measureParam: MeasureParam): number[] {
    return this.measureService.measure(measureParam);
  }
}
