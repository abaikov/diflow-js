
import { IQueryTransport } from './IQueryTransport';

export class QueryBus<TQuery, TResponse> {
  constructor(
    private readonly transport: IQueryTransport<TQuery, TResponse>
  ) {}

  registerHandler(handler: (query: TQuery) => Promise<TResponse>) {
    this.transport.on(handler);
  }

  trigger(query: TQuery): Promise<TResponse> {
    return this.transport.send(query);
  }
}
