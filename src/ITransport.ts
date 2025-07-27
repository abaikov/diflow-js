import { TCommandReturn } from './TCommandReturn';

export interface ITransport<TCommand, TResponse> {
	send(cmd: TCommand): TCommandReturn<TResponse>;
	on(handler: (cmd: TCommand) => TCommandReturn<TResponse>): void;
}
