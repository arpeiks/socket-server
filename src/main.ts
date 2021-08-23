import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WildcardsIoAdapter } from './notification.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*', credentials: true });
  app.useWebSocketAdapter(new WildcardsIoAdapter(app));
  await app.listen(8000);
}
bootstrap();
