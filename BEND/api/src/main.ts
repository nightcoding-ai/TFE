import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(
    {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"],
      exposedHeaders: ['Content-Disposition'],
        
    }
  );
  const config = new DocumentBuilder()
    .setTitle('API Endpoints')
    .setDescription('Every call for CRUD methods on Players, Teams, Tournaments, Matches, Join requests and Team invitation. Project does not provide a RESTFUL API.')
    .setVersion('1.0')
    .addTag('NEEDLESS BACKEND')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  await app.listen(3000);
}
bootstrap();
