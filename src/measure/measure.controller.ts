import { Controller, Get, Post, Body } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureParam } from './measure.param';
import HttpResponse from 'src/utils/api_res';

@Controller('measure')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @Post('measure')
  measure(@Body() measureParam: MeasureParam) {
    try {
      const res = this.measureService.measure(measureParam);
      return HttpResponse.ok(res);
    } catch (error) {
      return HttpResponse.err(error.msg);
    }
  }
}
