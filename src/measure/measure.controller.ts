import { Controller, Get } from '@nestjs/common';
import { MeasureService } from './measure.service';

@Controller('measure')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @Get('measure')
  measure(): string {
    return this.measureService.measure();
  }
}
