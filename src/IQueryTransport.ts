import { TCommandReturn } from './TCommandReturn';

export interface IQueryTransport<TQuery, TResponse> {
	send(query: TQuery): TCommandReturn<TResponse>;
	on(handler: (query: TQuery) => TCommandReturn<TResponse>): void;
}
