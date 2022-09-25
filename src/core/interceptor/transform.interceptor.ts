import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const res = {
          data,
          page: {},
          code: 0,
          msg: '请求成功',
        };
        if (data && data.list) {
          res.data = data.list;
        }
        if (data && data.page) {
          res.page = data.page;
        }
        return res;
      }),
    );
  }
}
