import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码
    const request = ctx.getRequest();

    // 设置错误信息
    let message = '';
    // `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    if (typeof exception?.response?.message === 'string') {
      message += `${exception?.response?.message};`;
    } else if (
      Array.isArray(exception?.response?.message) &&
      exception?.response?.message.length > 0
    ) {
      message = `${exception?.response?.message.join('')};`;
    }
    const errorResponse = {
      data: {
        error: message,
      },
      // error: exception,
      msg: `${message}`,
      code: -1,
      url: request.originalUrl, // 错误的url地址
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
