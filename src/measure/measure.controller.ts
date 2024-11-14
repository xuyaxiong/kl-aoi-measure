import { Controller, Get, Post, Body } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureParam } from './measure.param';
import HttpResponse from 'src/utils/api_res';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('测量')
@Controller('measure')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @Post('measure')
  @ApiOperation({ summary: '测量接口' })
  async measure(@Body() measureParam: MeasureParam) {
    try {
      const res = await this.measureService.measure(measureParam);
      return HttpResponse.ok(res);
    } catch (error) {
      return HttpResponse.err(error.msg);
    }
  }
}
