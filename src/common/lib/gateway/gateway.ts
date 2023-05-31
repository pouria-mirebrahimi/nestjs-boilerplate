import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// enum
import { WebSocketEventEnum } from '../enum/event.enum';

export abstract class AbsEventGateway {
  @WebSocketServer()
  private readonly server: Server;
  public readonly wsClients: Array<Socket> = [];

  handleConnection(@ConnectedSocket() client: any): void {
    // TODO you can use this token to validate the user once at the connection time
    // client.handshake.headers?.authorization?.toString()
    // TODO use these value to handle the class room
    // client.id
    // client.handshake.query?.lessonId?.toString()
    this.wsClients.push(client);
  }

  private afterInit(): void {
    this.server.emit(WebSocketEventEnum.INITIALIZE, { do: null });
  }

  private handleDisconnect(@ConnectedSocket() client: Socket): void {
    const clientId = client.id;
    const index = this.wsClients.findIndex((c) => c.id === clientId);
    this.wsClients.splice(index, 1);
    // this.broadcast(WebSocketEventEnum.DISCONNECT, { id: clientId });
  }

  broadcast(event: string, data: string | object): void {
    const message = JSON.stringify(data);
    this.wsClients.forEach((client) => client.emit(event, message));
  }
}
