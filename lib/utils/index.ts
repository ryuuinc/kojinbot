/* handle promise */
export function packPromise<T, K = Error>(promise: Promise<T>) {
  return promise
    .then<[undefined, T]>((response: T) => [undefined, response])
    .catch<[K, undefined]>((error: K) => [error, undefined]);
}
