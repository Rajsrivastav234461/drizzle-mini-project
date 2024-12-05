import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';

 async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=new DocumentBuilder()
  .setTitle('My Api CRUD operations with Drizzle DB')
  .setDescription('API documentation for CRUD operations with Drizzle DB')
  .setVersion('1.0')
   .addBearerAuth() // Adds Bearer Token input in Swagger
  .build()
  const document=SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors(); // Enable CORS if required

}
bootstrap();
