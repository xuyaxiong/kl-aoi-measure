import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { spawn } from 'child_process';
const path = require('path');
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import AppConfig from './app.config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
const chalk = require('chalk');
const figlet = require('figlet');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: configLogger(),
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  swaggerDoc(app);
  dllDump(process.pid);
  await app.listen(process.env.PORT ?? 3100);
  slogan('AOI MEASURE');
}

bootstrap();

function slogan(text: string) {
  console.log(
    chalk.blue(
      figlet.textSync(text, {
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
      }),
    ),
  );
}

function swaggerDoc(app) {
  const config = new DocumentBuilder()
    .setTitle('AOI MEASURE')
    .setDescription('AOI MEASURE')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

function dllDump(port: number) {
  const crashDir = AppConfig.CRASH_DUMP_DIR;
  fs.mkdirSync(crashDir, { recursive: true });
  const crashPath = path.join(crashDir, `${Date.now()}.dmp`);
  let procdumpPath = path.join(__dirname, 'procdump.exe');
  const procdump = spawn(procdumpPath, [
    '-accepteula',
    '-e',
    '-mm',
    String(port),
    crashPath,
  ]);
  procdump.stdout.on('data', (data) => {});

  procdump.stderr.on('data', (data) => {
    console.error('procdump_stderr', data.toString());
  });

  procdump.on('exit', (code) => {
    console.log('procdump_exit', `Child exited with code ${code}`);
  });
}

function configLogger() {
  const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
    dirname: AppConfig.APP_LOG_DIR,
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.uncolorize(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.printf(({ timestamp, level, message, context }) => {
        return `[${timestamp}] ${level.toUpperCase()} [${context || 'App'}]: ${message}`;
      }),
    ),
  });
  return WinstonModule.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.printf(({ level, message, timestamp, context }) => {
        const formatContext = chalk.yellow(`[${context}]`);
        return `[${timestamp}] ${level} ${formatContext}: ${message}`;
      }),
    ),
    transports: [dailyRotateFileTransport, new winston.transports.Console()],
  });
}
