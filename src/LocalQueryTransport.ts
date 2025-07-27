
import { IQueryTransport } from './IQueryTransport';

export class LocalQueryTransport<TQuery, TResponse> implements IQueryTransport<TQuery, TResponse> {
  private handler?: (query: TQuery) => Promise<TResponse>;

  async send(query: TQuery): Promise<TResponse> {
    if (!this.handler) throw new Error('No handler registered');
    return this.handler(query);
  }

  on(handler: (query: TQuery) => Promise<TResponse>) {
    this.handler = handler;
  }
}
