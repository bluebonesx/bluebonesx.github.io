type Merge<T, U> = {
  //@ts-ignore
  [K in keyof T | keyof U]: K extends keyof U ? U[K] : T[K];
};
type Eq<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U
  ? 1
  : 2
  ? true
  : false;
type IntToTuple<N extends number, T extends number[] = []> = Eq<
  T['length'],
  N
> extends true
  ? T
  : IntToTuple<N, [...T, T['length']]>;
type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
type LastOfUnion<T> = UnionToIntersection<
  T extends any ? (e: T) => void : never
> extends (e: infer R) => void
  ? R
  : never;
type UnionToTuple<T, S extends any[] = [], E = LastOfUnion<T>> = [T] extends [
  never
]
  ? S
  : UnionToTuple<Exclude<T, E>, [E, ...S]>;
