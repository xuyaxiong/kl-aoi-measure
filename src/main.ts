import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { spawn } from 'child_process';
import { join } from 'path';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);

  dllDump(process.pid);
}
bootstrap();

function dllDump(port: number) {
  const crashDir = 'D:\\kl-storage\\crashDump\\';
  fs.mkdirSync(crashDir, { recursive: true });
  const crashPath = `${crashDir}${Date.now()}.dmp`;
  let procdumpPath = join(__dirname, 'procdump.exe');
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
