type TBase<T, D> = [T, D];

type TReturn<T> = Promise<TBase<true, null> | TBase<false, T>>;

export async function tryCatch<T>(promise: Promise<T>): TReturn<T> {
  try {
    const result = await promise;
    return [false, result];
  } catch (err) {
    return [true, null];
  }
}
