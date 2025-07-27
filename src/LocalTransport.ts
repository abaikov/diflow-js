
import { ITransport } from './ITransport';

export class LocalTransport<TCommand, TResponse> implements ITransport<TCommand, TResponse> {
  private handler?: (cmd: TCommand) => Promise<TResponse>;

  async send(cmd: TCommand): Promise<TResponse> {
    if (!this.handler) throw new Error('No handler registered');
    return this.handler(cmd);
  }

  on(handler: (cmd: TCommand) => Promise<TResponse>) {
    this.handler = handler;
  }
}
