import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); //允许跨域

  const PORT = 3366;
  app.setGlobalPrefix('api'); //设置全局路由前缀
  app.useGlobalInterceptors(new TransformInterceptor()); //全局注册拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); //全局注册过滤器
  app.useGlobalPipes(new ValidationPipe());

  // swagger配置i
  const docConfig = new DocumentBuilder()
    .setTitle('狗蛋儿社区')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('docs', app, document);

  console.log(`nest app is run on prot:${PORT}`);
  await app.listen(PORT);
}
bootstrap();
