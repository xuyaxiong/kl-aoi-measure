import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import localConfig from './config/local.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasureController } from './measure/measure.controller';
import { MeasureService } from './measure/measure.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [localConfig] })],
  controllers: [AppController, MeasureController],
  providers: [AppService, MeasureService],
})
export class AppModule {}
