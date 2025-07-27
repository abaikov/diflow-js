import { IQueryTransport } from './IQueryTransport';
import { TCommandReturn } from './TCommandReturn';

export class QueryBus<TQuery, TResponse> {
	constructor(
		private readonly transport: IQueryTransport<TQuery, TResponse>,
	) {}

	registerHandler(handler: (query: TQuery) => TCommandReturn<TResponse>) {
		this.transport.on(handler);
	}

	trigger(query: TQuery): TCommandReturn<TResponse> {
		return this.transport.send(query);
	}
}
