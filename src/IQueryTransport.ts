
export interface IQueryTransport<TQuery, TResponse> {
  send(query: TQuery): Promise<TResponse>;
  on(handler: (query: TQuery) => Promise<TResponse>): void;
}
