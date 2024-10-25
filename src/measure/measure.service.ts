import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MeasureService {
  constructor(private readonly configService: ConfigService) {}
  measure(): string {
    return 'measure';
  }
}
