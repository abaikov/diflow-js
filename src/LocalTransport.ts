import { ITransport } from './ITransport';
import { TCommandReturn } from './TCommandReturn';

export class LocalTransport<TCommand, TResponse>
	implements ITransport<TCommand, TResponse>
{
	private handler?: (cmd: TCommand) => TCommandReturn<TResponse>;

	send(cmd: TCommand): TCommandReturn<TResponse> {
		if (!this.handler) throw new Error('No handler registered');
		return this.handler(cmd);
	}

	on(handler: (cmd: TCommand) => TCommandReturn<TResponse>) {
		this.handler = handler;
	}
}
