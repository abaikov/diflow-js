import { IQueryTransport } from './IQueryTransport';
import { TCommandReturn } from './TCommandReturn';

export class LocalQueryTransport<TQuery, TResponse>
	implements IQueryTransport<TQuery, TResponse>
{
	private handler?: (query: TQuery) => TCommandReturn<TResponse>;

	send(query: TQuery): TCommandReturn<TResponse> {
		if (!this.handler) throw new Error('No handler registered');
		return this.handler(query);
	}

	on(handler: (query: TQuery) => TCommandReturn<TResponse>) {
		this.handler = handler;
	}
}
