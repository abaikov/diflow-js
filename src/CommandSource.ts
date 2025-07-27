
import { ITransport } from './ITransport';

export class CommandSource<TCommand, TResponse> {
  constructor(
    public readonly name: string,
    private readonly transport: ITransport<TCommand, TResponse>
  ) {}

  registerHandler(handler: (cmd: TCommand) => Promise<TResponse>) {
    this.transport.on(handler);
  }

  trigger(cmd: Omit<TCommand, 'source'>): Promise<TResponse> {
    const fullCmd = { ...cmd, source: this.name } as TCommand;
    return this.transport.send(fullCmd);
  }
}
