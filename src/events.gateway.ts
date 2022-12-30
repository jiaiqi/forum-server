import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

// 注意ws端口号不能和http端口号一样，否则会冲突
@WebSocketGateway({
  path: '/chat',
})
export class EventsGateway {
  // SubscribeMessage里面的字符串代表类型，就是send event的值
  @SubscribeMessage('events')
  handleEvent(client: Socket, data: string) {
    return {
      msg: data,
    };
  }
  // handleEvent(
  //   @MessageBody() msg: string,
  //   @MessageBody() name: string,
  //   @ConnectedSocket() client: Socket,
  // ): WsResponse<unknown> {
  //   console.log('client', client);

  //   console.log('ws-msg', msg, name);
  //   const event = 'events';
  //   return {
  //     event,
  //     data: {
  //       sender: name,
  //       msg: msg,
  //     },
  //   };
  // }
}

// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   MessageBody,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';

// @WebSocketGateway(1234, {
//   // transports: ['websocket'],
//   // path: '/ws',
//   cors: {
//     origin: '*',
//   },
// })
// export class EventsGateway {
//   @WebSocketServer()
//   server: Server;

//   @SubscribeMessage('events')
//   handleEvent(@MessageBody() data: string): string {
//     console.log(data);

//     return data;
//   }
// }
