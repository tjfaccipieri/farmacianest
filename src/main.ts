import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00';

  const config = new DocumentBuilder()
    .setTitle('Farmacinha da turma JS07')
    .setDescription('Backend do projeto da Farmacia Backend')
    .setContact(
      'Thiago Faccipieri',
      'http://www.github.com/tjfaccipieri',
      'thiago.faccipieri@gmail.com',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
