export type TCommandReturn<T> = T | Promise<T>;

/**
 * @deprecated Use `TCommandReturn` instead.
 */
export type MaybePromise<T> = TCommandReturn<T>;
