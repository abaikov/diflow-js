
export interface ITransport<TCommand, TResponse> {
  send(cmd: TCommand): Promise<TResponse>;
  on(handler: (cmd: TCommand) => Promise<TResponse>): void;
}
