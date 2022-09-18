import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); //设置全局路由前缀
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter()); //全局注册拦截器
  await app.listen(3000);
}
bootstrap();
