import { Injectable } from '@nestjs/common';

@Injectable()
export class MeasureService {
  measure(): string {
    return 'measure';
  }
}
