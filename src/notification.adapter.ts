import { IoAdapter } from '@nestjs/platform-socket.io';

export class WildcardsIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.use((socket, next) => {
      console.log(socket.handshake.auth.userId);
      const userId = socket.handshake.auth.userId;
      console.log('adapter: ', userId);
      if (!userId) return next(new Error('invalid username'));
      socket.userId = userId;

      return next();
    });
    return server;
  }
}
