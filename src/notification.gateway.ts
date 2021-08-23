import {
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

interface ExtendedSocket extends Socket {
  userId: string;
}

@WebSocketGateway()
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('notification')
  sendNotification(
    meMessage: any,
    otherMessage: any,
    id: any,
    others: any,
  ): any {
    others.forEach((other) => {
      this.server.to(other).emit('notify', otherMessage);
    });

    this.server.in(id).emit('notify', meMessage);
  }

  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(socket: ExtendedSocket) {
    console.log('joining', socket.userId);
    socket.join(String(socket.userId));
  }
}
