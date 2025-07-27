import { ITransport } from './ITransport';
import { TCommandReturn } from './TCommandReturn';

export class CommandSource<TCommand, TResponse> {
	constructor(
		public readonly name: string,
		private readonly transport: ITransport<TCommand, TResponse>,
	) {}

	registerHandler(handler: (cmd: TCommand) => TCommandReturn<TResponse>) {
		this.transport.on(handler);
	}

	trigger(cmd: Omit<TCommand, 'source'>): TCommandReturn<TResponse> {
		const fullCmd = { ...cmd, source: this.name } as TCommand;
		return this.transport.send(fullCmd);
	}
}
