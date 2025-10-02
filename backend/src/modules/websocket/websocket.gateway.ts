import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection() {}
  handleDisconnect() {}

  broadcast(event: string, payload: unknown) {
    this.server.emit(event, payload);
  }
}
